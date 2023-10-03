import apiFetch from '@wordpress/api-fetch';

const setInitialState = (store) => {
	apiFetch({
		path: '/login-me-now/admin/settings/',
	}).then((data) => {
		const initialState = {
			settingsSavedNotification: '',
			settingsNotSavedNotification: '',
			magicLinkPopup: '',
			initialStateSetFlag: true,
			activeSettingsNavigationTab: 'global-settings',
			activeSocialLoginNavigationTab: 'google',

			lmnProLic: data.lmn_pro_lic,

			enableLogs: data.logs,
			logsExpiration: data.logs_expiration,

			enableUserSwitching: data.user_switching,

			enableGoogleLogin: data.google_login,
			enableGoogleClientID: data.google_client_id,
			enableGoogleNativeLogin: data.google_native_login,
			enableGoogleUpdateExistingUserData: data.google_update_existing_user_data,
			enableGoogleUpdateExistingUserAvatar: data.google_pro_user_avatar,
			enableGoogleCancelOnTapOutside: data.google_cancel_on_tap_outside,
			selectGoogleSelectedLocation: data.google_onetap_display_location,

			enableGoogleLoginSelectLocation: data.google_login_select_location || true,
			selectGoogleProDefaultUserRole: data.google_pro_default_user_role,
			inputGoogleProRedirectUrl: data.google_pro_redirect_url,

			getUserRoles: data.get_user_roles,
			getPages: data.get_pages,

			blocksStatuses: data.pro_addons,
		};

		store.dispatch({ type: 'UPDATE_INITIAL_STATE', payload: initialState });
	});
};

export default setInitialState;
