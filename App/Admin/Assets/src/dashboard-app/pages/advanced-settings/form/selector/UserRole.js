import React from 'react';
import { useSelector } from 'react-redux';

function UserRole({ userRole, handleUserRole, classNames }) {
  const getUserRoles = useSelector((state) => state.getUserRoles);
  const roles = typeof getUserRoles === 'object' ? getUserRoles : null;

  return (
    <select className={classNames} value={userRole} onChange={handleUserRole}>
      {roles &&
        Object.keys(roles).map((key) => (
          <option key={key} value={key} SelectedValute>{roles[key]}</option>
        ))}
        
    </select>
  );
}

export default UserRole;
