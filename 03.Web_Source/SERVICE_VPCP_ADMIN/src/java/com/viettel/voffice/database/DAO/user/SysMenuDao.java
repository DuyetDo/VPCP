/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.viettel.voffice.database.DAO.user;

import com.viettel.voffice.database.entity.admin.SysMenuEntity;
import com.viettel.voffice.library.basecore.database.CoreFuncDataBaseDAO;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author datnv5
 */
public class SysMenuDao {
    /**
     * kiem tra du lieu login he thong
     * @param idParent
     * @return 
     */
    public  List<SysMenuEntity> getListDataMenu(Long idParent){
        if(idParent == null){
            StringBuilder sqlBuilder = new StringBuilder();
            sqlBuilder.append(" select id,nvl(parent_id,0) parent_id,name,description,url_page_link,");
            sqlBuilder.append(" SHOWALL showallpeople,CLASS_ICON iconsclass ");
            sqlBuilder.append("  from sysmenuentity  ");
            
            
            List<Object> params = new ArrayList<>();
            params.add(idParent);
            CoreFuncDataBaseDAO repo = new CoreFuncDataBaseDAO();
            List<SysMenuEntity> lst = (List<SysMenuEntity>) repo.getListRecord(sqlBuilder, params,
                    null, null, SysMenuEntity.class);
            return lst;
        }
        return null;
    }
    
    public static void main(String[] args) {
        SysMenuDao sysMenuDao = new SysMenuDao();
        sysMenuDao.getListDataMenu(null);
    }
}
