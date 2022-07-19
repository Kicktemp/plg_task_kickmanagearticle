<?php
/**
 * @package    [PACKAGE_NAME]
 *
 * @author     [AUTHOR] <[AUTHOR_EMAIL]>
 * @copyright  [AUTHOR_URL]
 * @license    [LICENSE]
 * @link       [AUTHOR_URL]
 */

defined('_JEXEC') or die;

use Joomla\CMS\Factory;

/**
 * KickManageArticle script file.
 *
 * @package   plg_task_kickmanagearticle
 * @since     1.0.0
 */
class plgTaskKickManageArticleInstallerScript
{
	public function __construct()
	{
		// Define the minimum versions to be supported.
		$this->minimumJoomla = '4.0';
		$this->minimumPhp    = '7.2.5';

		$this->dir = __DIR__;
	}

	/**
	 * Called on installation
	 *
	 * @return  boolean  True on success
	 */
	public function install() {
		Factory::getDBO()->setQuery("UPDATE #__extensions SET enabled = 1 WHERE type = 'plugin' AND folder = 'task' AND element = 'kickmanagearticle'")->execute();
	}
}
