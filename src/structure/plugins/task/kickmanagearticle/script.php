<?php
/**
 * @package    [PACKAGE_NAME]
 *
 * @author     [AUTHOR] <[AUTHOR_EMAIL]>
 * @copyright  [COPYRIGHT]
 * @license    [LICENSE]
 * @link       [AUTHOR_URL]
 */

defined('_JEXEC') or die;

use Joomla\CMS\Factory;
use Joomla\CMS\Installer\InstallerScript;

/**
 * KickManageArticle script file.
 *
 * @package   plg_task_kickmanagearticle
 * @since     1.0.0
 */
class plgTaskKickManageArticleInstallerScript extends InstallerScript
{
	/**
	 * Minimum PHP version required to install the extension
	 *
	 * @var    string
	 * @since  3.6
	 */
	protected $minimumPhp = '7.2.5';

	/**
	 * Minimum Joomla! version required to install the extension
	 *
	 * @var    string
	 * @since  3.6
	 */
	protected $minimumJoomla = '4.0';

	/**
	 * @param $type
	 * @param $parent
	 * @return true|void
	 */
	public function preflight($type, $parent)
	{
		if (!in_array($type, ['install', 'update'])) {
			return true;
		}
	}

	/**
	 * @param $install_type
	 * @param $parent
	 * @return true|void
	 */
	public function postflight($install_type, $parent)
	{
		if (!in_array($install_type, ['install', 'update']))
		{
			return true;
		}

		$this->removeFiles();
	}

	/**
	 * @return void
	 */
	public function install() {
		Factory::getDBO()->setQuery("UPDATE #__extensions SET enabled = 1 WHERE type = 'plugin' AND folder = 'task' AND element = 'kickmanagearticle'")->execute();
	}
}
