/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.viettel.voffice.entity.admin;

import com.viettel.voffice.web.library.basecore.entity.CoreCommonEntity;

/**
 *
 * @author datnv5
 */
public class UserInfoEntity {
    CoreCommonEntity coreCommonEntity;
    RoleEntity roleEntity;

    public CoreCommonEntity getCoreCommonEntity() {
        return coreCommonEntity;
    }

    public void setCoreCommonEntity(CoreCommonEntity coreCommonEntity) {
        this.coreCommonEntity = coreCommonEntity;
    }
    
    public RoleEntity getRoleEntity() {
        return roleEntity;
    }

    public void setRoleEntity(RoleEntity roleEntity) {
        this.roleEntity = roleEntity;
    }
    
    
    
}
