/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.viettel.voffice.action;


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
public class DemoAction {
    public List<Demo> getListSysMenu() {
        
            HttpSession session = (HttpSession)
                    (Executions.getCurrent()).getDesktop().getSession().getNativeSession();
            CoreDataResponseEntity sysUserEntity =
                    (CoreDataResponseEntity) Sessions.getCurrent().getAttribute(session.getId());
            
            CoreLibWebCommon libWebCommon = new CoreLibWebCommon();
            Map<String, Object> params = new LinkedHashMap<>();
            params.put("userName", "");
            CoreDataResponseEntity coreDataResponseEntity
                    = libWebCommon.requestDataToServer("demo.list", null,null);
            String strDataList =  coreDataResponseEntity.getData();

            List<Demo> listResult = (List<Demo>) FunctionCommon.convertJsonToListObject(
                   strDataList, Demo.class);

            
            return listResult;
    }
    public static void main(String[] agrs)
    {
//        System.out.println(getList());
        DemoAction s=new DemoAction();
      
        System.out.println("hhjbhj");
        s.getListSysMenu();
    }
}
