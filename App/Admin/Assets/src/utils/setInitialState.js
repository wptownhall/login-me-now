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

			selectGoogleProExcludePages: data.google_pro_exclude_pages,
			selectGoogleProDefaultUserRole: data.google_pro_default_user_role,
			inputGoogleProRedirectUrl: data.google_pro_redirect_url,

			enableFacebookLogin: data.facebook_login,
			enableFacebookClientID: data.facebook_client_id,
			enableFacebookNativeLogin: data.facebook_native_login,
			enableFacebookUpdateExistingUserData: data.facebook_update_existing_user_data,
			enableFacebookUpdateExistingUserAvatar: data.facebook_pro_user_avatar,
			enableFacebookCancelOnTapOutside: data.facebook_cancel_on_tap_outside,

			selectFacebookProExcludePages: data.facebook_pro_exclude_pages,
			selectFacebookProDefaultUserRole: data.facebook_pro_default_user_role,
			inputFacebookProRedirectUrl: data.facebook_pro_redirect_url,

			getUserRoles: data.get_user_roles,
			getPages: data.get_pages,

			blocksStatuses: data.pro_addons,
		};

		store.dispatch({ type: 'UPDATE_INITIAL_STATE', payload: initialState });
	});
};

export default setInitialState;
