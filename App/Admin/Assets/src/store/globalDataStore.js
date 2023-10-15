import { createStore } from 'redux';
import globalDataReducer from './globalDataReducer';

const initialState = wp.hooks.applyFilters('login_me_now_dashboard/datastore', {
	initialStateSetFlag: false,
	enableLoadFontsLocally: false,

	lmnProLic: '',

	enableLogs: true,
	logsExpiration: 7,
	
	enableUserSwitching: true,

	enableGoogleLogin: false,
	enableGoogleClientID: '',
	enableGoogleNativeLogin: true,
	enableGoogleAutoSignIn: false,
	enableGoogleUpdateExistingUserData: true,
	enableGoogleUpdateExistingUserAvatar: true,
	enableGoogleCancelOnTapOutside: true,
	enableGoogleLoginSelectLocation: true,
	
	selectGoogleProSelectedPages: [],
	enableGoogleOneTap: false,
	selectGoogleSelectedLocation: 'siteWide',
	selectGoogleProDefaultUserRole: 'subscriber',
	inputGoogleProRedirectUrl: '',

	getUserRoles: 'subscriber',
	get_pages: '',

	enableWhiteLabel: false,
	enableBeta: 'disable',
	settingsSavedNotification: '',
	settingsNotSavedNotification: '',
	magicLinkPopup: '',
	blocksStatuses: [],
	enableFileGeneration: 'disable',
	activeSettingsNavigationTab: '',
	activeSocialLoginNavigationTab: '',
}
);

const globalDataStore = createStore(
	globalDataReducer,
	initialState,
	window.__REDUX_DEVTOOLS_EXTENSION__ &&
	window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default globalDataStore;
