import { __ } from '@wordpress/i18n';
import { useSelector, useDispatch } from 'react-redux';
import apiFetch from '@wordpress/api-fetch';
import { useState } from 'react';

const License = () => {
  const [license, setLicense] = useState("")
  let lmnProLic = useSelector((state) => state.lmnProLic);
  const dispatch = useDispatch();
  const updateLicense = () => {
    dispatch({ type: 'UPDATE_LMN_PRO_LIC', payload: license });
    
    const formData = new window.FormData();
    formData.append('action', 'login_me_now_pro_activate_license');
    formData.append('security', lmn_admin.update_nonce);
    formData.append('key', 'lmn_pro_lic');
    formData.append('value', license);

    apiFetch({
      url: lmn_admin.ajax_url,
      method: 'POST',
      body: formData,
    }).then((data) => {
      if( false === data.success ) {
        dispatch({ type: 'UPDATE_SETTINGS_NOT_SAVED_NOTIFICATION', payload: data.data});
      } else {
        dispatch({ type: 'UPDATE_SETTINGS_SAVED_NOTIFICATION', payload: __('Successfully saved!', 'login-me-now') });
      }
    });
  };

  console.log(lmnProLic)

  return (
    <section className={`text-[16px] block px-8 py-8 justify-between`}>
      <div className='mr-16 w-full flex flex-col space-y-3'>
        <h3 className="p-0 flex-1 justify-right inline-flex text-xl leading-6 font-semibold text-slate-800">
          {__('License', 'login-me-now')}
        </h3>
        <div className="flex">
        <input onChange={(e) => setLicense(e.target.value)} className='block w-full h-[50px] !p-3 !border-slate-200' type='password' name='lmn_pro_lic' value={lmnProLic} placeholder='Enter your license here...' />
        <button
          className="h-[50px] !p-3 !border-slate-200 border ml-3 rounded-[4px] text-[#5cabd3] font-semibold"
          onClick={updateLicense}
        >
          Active
        </button>
        </div>
        <span class="text-[#2271B1]">
          {__('Add your purchased license here for future updates', 'login-me-now')} 
        </span>
      </div>
    </section>
  )
}

export default License;