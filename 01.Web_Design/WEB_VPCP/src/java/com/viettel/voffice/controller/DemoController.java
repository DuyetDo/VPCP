/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.viettel.voffice.controller;

import com.viettel.voffice.entity.document.Demo;
import com.viettel.voffice.share.FunctionCommon;
import com.viettel.voffice.web.library.basecore.CoreLibWebCommon;
import com.viettel.voffice.web.library.basecore.entity.CoreDataResponseEntity;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpSession;
import org.zkoss.zk.ui.Executions;
import org.zkoss.zk.ui.Sessions;

/**
 *
 * @author Administrator
 */
public class DemoController {
    
      public List<Demo> getListDemo() {
             HttpSession session = (HttpSession)
                    (Executions.getCurrent()).getDesktop().getSession().getNativeSession();
            CoreDataResponseEntity sysUserEntity =
                    (CoreDataResponseEntity) Sessions.getCurrent().getAttribute(session.getId());
            
            CoreLibWebCommon libWebCommon = new CoreLibWebCommon();
            Map<String, Object> params = new LinkedHashMap<>();
            params.put("name", "khong hieu noi du lieu");
            CoreDataResponseEntity coreDataResponseEntity
                    = libWebCommon.requestDataToServer("demo.list", params,sysUserEntity );
            String strDataList =  coreDataResponseEntity.getData();
            System.out.println(strDataList);
            List<Demo> listResult = (List<Demo>) FunctionCommon.convertJsonToListObject(
                   strDataList, Demo.class);
            
            return listResult;
    }
      public Demo getDetailDemo(int id) {
        HttpSession session = (HttpSession)
                (Executions.getCurrent()).getDesktop().getSession().getNativeSession();
        CoreDataResponseEntity sysUserEntity =
                (CoreDataResponseEntity) Sessions.getCurrent().getAttribute(session.getId());

        CoreLibWebCommon libWebCommon = new CoreLibWebCommon();
        Map<String, Object> params = new LinkedHashMap<>();
        params.put("id", id);
        CoreDataResponseEntity coreDataResponseEntity
                = libWebCommon.requestDataToServer("demo.chitiet", params, sysUserEntity);
        String strDataList =  coreDataResponseEntity.getData();
        Demo documentEntity = (Demo) FunctionCommon.convertJsonToObject(
               strDataList, Demo.class);
        return documentEntity;
    }
       public void addDemo(Demo demo) {
           HttpSession session = (HttpSession)
                (Executions.getCurrent()).getDesktop().getSession().getNativeSession();
        CoreDataResponseEntity sysUserEntity =
                (CoreDataResponseEntity) Sessions.getCurrent().getAttribute(session.getId());

        CoreLibWebCommon libWebCommon = new CoreLibWebCommon();
        Map<String, Object> params = new LinkedHashMap<>();
//        params.put("data", demo);
        params.put("id", demo.getId());
        params.put("password", demo.getPassword());
        params.put("username", demo.getUsername());
        CoreDataResponseEntity coreDataResponseEntity
                = libWebCommon.requestDataToServer("demo.add", params, sysUserEntity);
//        String strDataList =  coreDataResponseEntity.getData();
//
//        List<Demo> listResult = (List<Demo>) FunctionCommon.convertJsonToListObject(
//               strDataList, Demo.class);
            
//            return listResult;
  
    }
       
      public static void main(String[] args) {
            
        DemoController demoController = new DemoController();
        
          System.out.println(demoController.getListDemo());
    }

    public List<Demo> search(String keyword) {
         HttpSession session = (HttpSession)
                    (Executions.getCurrent()).getDesktop().getSession().getNativeSession();
            CoreDataResponseEntity sysUserEntity =
                    (CoreDataResponseEntity) Sessions.getCurrent().getAttribute(session.getId());
            
            CoreLibWebCommon libWebCommon = new CoreLibWebCommon();
            Map<String, Object> params = new LinkedHashMap<>();
            params.put("keyword", keyword);
            CoreDataResponseEntity coreDataResponseEntity
                    = libWebCommon.requestDataToServer("demo.search", params,sysUserEntity );
            String strDataList =  coreDataResponseEntity.getData();
            System.out.println(strDataList);
            List<Demo> listResult = (List<Demo>) FunctionCommon.convertJsonToListObject(
                   strDataList, Demo.class);
            
            return listResult;
    }
}
