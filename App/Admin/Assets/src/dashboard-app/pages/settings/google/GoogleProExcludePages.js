import { __ } from '@wordpress/i18n';
import { useSelector, useDispatch } from 'react-redux';
import Multiselect from 'multiselect-react-dropdown';
import apiFetch from '@wordpress/api-fetch';
import ProBtn from '../../social-login/google/components/ProBtn';

function classNames(...classes) {
	return classes.filter(Boolean).join(' ')
}

const GoogleProExcludePages = () => {
	const enableGoogleLogin = useSelector((state) => state.enableGoogleLogin);
	const enableGoogleLoginStatus = false === enableGoogleLogin ? false : true;
	const dispatch = useDispatch();

	const selectedIDs = useSelector((state) => state.selectGoogleProExcludePages);
	const isProAvailable = lmn_admin.pro_available ? true : false;
	const allPages = useSelector((state) => state.getPages);
	
	let selectedPages;
	if (selectedIDs && selectedIDs.length > 0) {
		selectedPages = allPages.filter(page => selectedIDs.includes(page.id));
	} else {
		selectedPages = [];
	}

	const updateGoogleProExcludePage = (selectedPages) => {
		let ids = selectedPages.map(page => page.id);

		dispatch({ type: 'UPDATE_SELECT_GOOGLE_PRO_EXCLUDE_PAGES', payload: ids });
	
		const formData = new window.FormData();
		formData.append('action', 'login_me_now_update_admin_setting');
		formData.append('security', lmn_admin.update_nonce);
		formData.append('key', 'google_pro_exclude_pages');
		formData.append('value', ids);
	
		apiFetch({
		  url: lmn_admin.ajax_url,
		  method: 'POST',
		  body: formData,
		}).then(() => {
		  dispatch({ type: 'UPDATE_SETTINGS_SAVED_NOTIFICATION', payload: __('Successfully saved!', 'login-me-now') });
		});
	};

	return (
		<section className={`${enableGoogleLoginStatus ? 'block' :'hidden'} login-me-now-dep-field-${isProAvailable ? 'true' : 'false'} block border-b border-solid border-slate-200 px-8 py-8 justify-between`}>
			<div className='mr-16 w-full items-center'>
				<h3 className="p-0 flex-1 justify-right inline-flex text-xl leading-6 font-semibold text-slate-800">
					{__('Exclude one tap prompt for', 'login-me-now')}
					{ ! lmn_admin.pro_available ? (
						<ProBtn />)
						: 
						''
					}
				</h3>

				<Multiselect
					options={allPages}
					selectedValues={selectedPages}
					onSelect={updateGoogleProExcludePage}
					onRemove={updateGoogleProExcludePage}
					displayValue="name"
					className='mt-3'
				/>
				
			</div>
			<p className="mt-6 w-9/12 text-[16px] text-slate-500 tablet:w-full">
				{__("Select for which pages one tap prompt won't display", 'login-me-now')}
			</p>
		</section>
	);
};

export default GoogleProExcludePages;
