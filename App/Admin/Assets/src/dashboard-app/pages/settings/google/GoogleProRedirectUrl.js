import { __ } from '@wordpress/i18n';
import { useSelector, useDispatch } from 'react-redux';
import { Switch } from '@headlessui/react'
import apiFetch from '@wordpress/api-fetch';
import ProBtn from '../../social-login/google/components/ProBtn';

function classNames(...classes) {
	return classes.filter(Boolean).join(' ')
}

const GoogleProRedirectUrl = () => {

	const enableGoogleLogin = useSelector((state) => state.enableGoogleLogin);
	const enableGoogleLoginStatus = false === enableGoogleLogin ? false : true;
	const dispatch = useDispatch();
	const inputGoogleProRedirectUrl = useSelector((state) => state.inputGoogleProRedirectUrl);
	const inputGoogleProRedirectUrlStatus = false === inputGoogleProRedirectUrl ? false : true;
	const isProAvailable = lmn_admin.pro_available ? true : false;

	const updateGoogleProRedirectUrl = (URL) => {
		dispatch({ type: 'UPDATE_INPUT_GOOGLE_PRO_REDIRECT_URL', payload: URL.target.value });
		
		const formData = new window.FormData();
		formData.append('action', 'login_me_now_update_admin_setting');
		formData.append('security', lmn_admin.update_nonce);
		formData.append('key', 'google_pro_redirect_url');
		formData.append('value', URL.target.value);
	
		apiFetch({
		  url: lmn_admin.ajax_url,
		  method: 'POST',
		  body: formData,
		}).then(() => {
		  dispatch({ type: 'UPDATE_SETTINGS_SAVED_NOTIFICATION', payload: __('Successfully saved!', 'login-me-now') });
		});
	  };
	

	return (
		<section className={`${enableGoogleLoginStatus ? 'block' :'hidden'} login-me-now-dep-field-${isProAvailable ? 'true' : 'false'} text-sm block border-b border-solid border-slate-200 px-8 py-8 justify-between`}>
			<div className='mr-16 w-full flex flex-col space-y-3'>
				<h3 className="p-0 flex-1 justify-right inline-flex text-xl leading-6 font-semibold text-slate-800">
					{__('Redirect after successful login and registration', 'login-me-now')}
					{ ! isProAvailable ? (
						<ProBtn />)
						: 
						''
					}
				</h3>
				<input onChange={updateGoogleProRedirectUrl} className='block w-full h-[50px] !p-3 !border-slate-200' value={inputGoogleProRedirectUrl} type='text' name='name'  placeholder='ex: https://example.com/dashboard/' />
				<p className="mt-2 w-9/12 text-[16px] text-slate-500 tablet:w-full">
					{__("By default redirection is set to dashboard", 'login-me-now')}
				</p>
			</div>
		</section>
	);
};

export default GoogleProRedirectUrl;
