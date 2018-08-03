/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.viettel.voffice.controller;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.google.gson.internal.LinkedTreeMap;
import com.viettel.voffice.database.DAO.document.DemoDAO;
import com.viettel.voffice.database.entity.document.Demo;
import com.viettel.voffice.library.basecore.entity.CoreCommonEntity;
import com.viettel.voffice.library.basecore.entity.CoreErrorApp;
import com.viettel.voffice.library.basecore.utils.CoreUtilsCommon;
import com.viettel.voffice.util.FunctionCommon;
import java.util.List;
import javax.servlet.http.HttpServletRequest;

/**
 *
 * @author Administrator
 */
public class DemoController {

    public String getList(HttpServletRequest req, String data) {
        CoreCommonEntity commonDataClient = FunctionCommon.getRequestFromClient(
                req, null, data, Demo.class);
        if (commonDataClient.getUserInfor() != null) {
            Demo params = (Demo) commonDataClient.getParams();
            DemoDAO sysMenuDao = new DemoDAO();
            List<Demo> listMenu = sysMenuDao.getList();
            return CoreUtilsCommon.responseData(CoreErrorApp.SUCCESS,
                    listMenu, commonDataClient);
        } else {
            return CoreUtilsCommon.responseData(CoreErrorApp.ERR_NOSESSION, null, null);
        }
    }

    public String getDemoDetail(HttpServletRequest req, String data) {
        CoreCommonEntity commonDataClient = FunctionCommon.getRequestFromClient(
                req, null, data, Demo.class);
//            if(commonDataClient.getUserInfor() !=null){
//              return  CoreUtilsCommon.responseData(CoreErrorApp.ERR_NOSESSION, null, null);
//            }
//            Demo params = (Demo) commonDataClient.getParams();
//            
//            DemoDAO documentDao = new DemoDAO();
//            Demo documentEntity = documentDao.getDetailDemo(params.getId());
//                   
//            return CoreUtilsCommon.responseData(CoreErrorApp.SUCCESS, 
//                        documentEntity , commonDataClient);
        if (commonDataClient.getUserInfor() != null) {
            Demo params = (Demo) commonDataClient.getParams();
            DemoDAO sysMenuDao = new DemoDAO();
            Demo listMenu = sysMenuDao.getDetailDemo(params.getId());
            return CoreUtilsCommon.responseData(CoreErrorApp.SUCCESS,
                    listMenu, commonDataClient);
        } else {
            return CoreUtilsCommon.responseData(CoreErrorApp.ERR_NOSESSION, null, null);
        }

    }
    public String addOrUpdate(HttpServletRequest req, String data) {
        CoreCommonEntity commonDataClient = FunctionCommon.getRequestFromClient(
                req, null, data, Object.class);     
        if (commonDataClient.getUserInfor() != null) {
            System.out.println(commonDataClient.getParams());
            LinkedTreeMap sParams = (LinkedTreeMap) commonDataClient.getParams();
            String ss = (String) sParams.get("data");
            Gson gson = new Gson();
            Demo params = gson.fromJson(ss, Demo.class);
            DemoDAO sysMenuDao = new DemoDAO();
            if (null == params.getId() || 0 == params.getId()) {
//                insert
                sysMenuDao.add(params);
            } else {
//                update or delete
                sysMenuDao.update(params);
            }
            return CoreUtilsCommon.responseData(CoreErrorApp.SUCCESS,
                    null, commonDataClient);
        } else {
            return CoreUtilsCommon.responseData(CoreErrorApp.ERR_NOSESSION, null, null);
        }
    }
    public String search(HttpServletRequest req, String data) {
        CoreCommonEntity commonDataClient = FunctionCommon.getRequestFromClient(
                req, null, data, Demo.class);
        if (commonDataClient.getUserInfor() != null) {
            Demo params = (Demo) commonDataClient.getParams();
            DemoDAO sysMenuDao = new DemoDAO();
            List<Demo> listMenu = sysMenuDao.search(params.getKeyword());
            return CoreUtilsCommon.responseData(CoreErrorApp.SUCCESS,
                    listMenu, commonDataClient);
        } else {
            return CoreUtilsCommon.responseData(CoreErrorApp.ERR_NOSESSION, null, null);
        }
    }
}
