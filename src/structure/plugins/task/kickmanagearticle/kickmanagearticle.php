<?php
/**
 * @package    [PROJECT_NAME]
 *
 * @author     [AUTHOR] <[AUTHOR_EMAIL]>
 * @copyright  [COPYRIGHT]
 * @license    [LICENSE]
 * @link       [AUTHOR_URL]
 */

defined('_JEXEC') or die;

use Joomla\CMS\Factory;
use Joomla\CMS\Plugin\CMSPlugin;
use Joomla\Component\Content\Site\Helper\QueryHelper;
use Joomla\Component\Scheduler\Administrator\Event\ExecuteTaskEvent;
use Joomla\Component\Scheduler\Administrator\Task\Status as TaskStatus;
use Joomla\Component\Scheduler\Administrator\Traits\TaskPluginTrait;
use Joomla\Database\DatabaseDriver;
use Joomla\Database\ParameterType;
use Joomla\Event\SubscriberInterface;

class plgTaskKickManageArticle extends CMSPlugin implements SubscriberInterface
{
	use TaskPluginTrait;

	/**
	 * @var string[]
	 *
	 * @since 1.0.0
	 */
	protected const TASKS_MAP = [
		'kickmanagearticle.move' => [
			'langConstPrefix' => 'PLG_TASK_KICKMANAGEARTICLE_MOVE',
			'form'            => 'move',
			'method'          => 'moveArticle',
		],
	];

	/**
	 * Load the language file on instantiation.
	 *
	 * @var    boolean
	 *
	 * @since  4.0.0
	 */
	protected $autoloadLanguage = true;

	/**
	 * Returns an array of events this subscriber will listen to.
	 *
	 * @return  array
	 *
	 * @since   4.0.0
	 */
	public static function getSubscribedEvents(): array
	{
		return [
			'onTaskOptionsList'    => 'advertiseRoutines',
			'onExecuteTask'        => 'standardRoutineHandler',
			'onContentPrepareForm' => 'enhanceTaskItemForm',
		];
	}

	/**
	 * @param   ExecuteTaskEvent  $event  The onExecuteTask event
	 *
	 * @return integer  The exit code
	 *
	 * @throws RuntimeException
	 * @throws LogicException
	 * @since 4.1.0
	 */
	protected function moveArticle(ExecuteTaskEvent $event): int
	{
		$params  = $event->getArgument('params');
		$toCatid = (int) $params->toCatid;

		/** @var DatabaseDriver $db */
		$db            = Factory::getContainer()->get('DatabaseDriver');
		$query         = $db->getQuery(true);
		$now           = Factory::getDate('now', 'GMT');
		$queryDate     = QueryHelper::getQueryDate($params->moveDate, $db);
		$date          = new \DateInterval(sprintf('P%dY%dM%dDT%dH%dM', $params->years, $params->months, $params->days, $params->hours, $params->minutes));
		$timeThreshold = (clone $now)->sub($date)->toSql();

		$query->select($db->quoteName('a.id'))
			->from($db->quoteName('#__content', 'a'))
			->where($queryDate . '< :threshold')
			->where($db->quoteName('a.catid') . ' = :categoryId')
			->bind(':threshold', $timeThreshold, ParameterType::STRING)
			->bind(':categoryId', $params->fromCatid, ParameterType::INTEGER);

		$db->setQuery($query);
		$pks = $db->loadColumn();

		if (count($pks) && $toCatid)
		{
			// Remove zero values resulting from input filter
			$pks = array_filter($pks);

			$batchVars = [
				'category_id' => $toCatid,
				'move_copy'   => 'm',
			];

			foreach ($pks as $id)
			{
				// If we're coming from com_categories, we need to use extension vs. option
				$contexts[$id] = 'com_content.articles.' . $id;
			}

			try
			{
				/** @var \Joomla\Component\Content\Administrator\Model\ArticleModel $model */
				$model = Factory::getApplication()->bootComponent('com_content')->getMVCFactory()->createModel('Article', 'Administrator', ['ignore_request' => true]);

				if (!$model->batch($batchVars, $pks, $contexts))
				{
					return TaskStatus::NO_RUN;
				}
			}
			catch (\RuntimeException $e)
			{
				$this->logTask($e->getMessage(), 'error');

				return TaskStatus::NO_RUN;
			}

		}

		return TaskStatus::OK;
	}
}
