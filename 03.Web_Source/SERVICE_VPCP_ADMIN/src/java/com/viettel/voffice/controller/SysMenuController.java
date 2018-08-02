/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.viettel.voffice.controller;

import com.viettel.voffice.database.DAO.user.SysMenuDao;
import com.viettel.voffice.database.entity.admin.SysMenuEntity;
import com.viettel.voffice.library.basecore.entity.CoreCommonEntity;
import com.viettel.voffice.library.basecore.entity.CoreErrorApp;
import com.viettel.voffice.library.basecore.utils.CoreUtilsCommon;
import com.viettel.voffice.util.FunctionCommon;
import java.util.List;
import javax.servlet.http.HttpServletRequest;

/**
 *
 * @author datnv5
 */
public class SysMenuController {

    /**
     * lay danh sach menu theo id cha duoc truyen qua data
     * @param req
     * @param data
     * @return 
     */
    public String getMenuFromIdParent(HttpServletRequest req, String data) {
        CoreCommonEntity commonDataClient = FunctionCommon.getRequestFromClient(
                req, null, data, SysMenuEntity.class);
        if(commonDataClient.getUserInfor() !=null){
            SysMenuEntity params = (SysMenuEntity) commonDataClient.getParams();
            System.out.println("name:" + params.getName());
            System.out.println("url_page_link:" + params.getUrl_page_link());
            
            
            SysMenuDao sysMenuDao = new SysMenuDao();
            List<SysMenuEntity> listMenu = sysMenuDao.getListDataMenu(null);
            return CoreUtilsCommon.responseData(CoreErrorApp.SUCCESS, 
                        listMenu , commonDataClient);
        }else{
             return  CoreUtilsCommon.responseData(CoreErrorApp.ERR_NOSESSION, null, null);
        }
    }
    
}
