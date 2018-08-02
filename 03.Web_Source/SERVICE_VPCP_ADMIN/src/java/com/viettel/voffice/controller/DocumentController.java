/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.viettel.voffice.controller;
import com.viettel.voffice.database.DAO.document.DocumentDao;
import com.viettel.voffice.database.entity.admin.SysMenuEntity;
import com.viettel.voffice.database.entity.document.DocumentEntity;
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
public class DocumentController {
    public String getListDocumentReceive(HttpServletRequest req, String data) {
        CoreCommonEntity commonDataClient = FunctionCommon.getRequestFromClient(
                req, null, data, SysMenuEntity.class);
        if(commonDataClient.getUserInfor() !=null){
            SysMenuEntity params = (SysMenuEntity) commonDataClient.getParams();
            
            
            DocumentDao documentDao = new DocumentDao();
            List<DocumentEntity> listMenu = documentDao.getListDocumentReceive(commonDataClient.getUserInfor());
            return CoreUtilsCommon.responseData(CoreErrorApp.SUCCESS, 
                        listMenu , commonDataClient);
        }else{
             return  CoreUtilsCommon.responseData(CoreErrorApp.ERR_NOSESSION, null, null);
        }
    }

    /**
     * lay thong tin chi tiet van ban theo id
     * @param req
     * @param data
     * @return 
     */
    public String getDocumentDetail(HttpServletRequest req, String data) {
        CoreCommonEntity commonDataClient = FunctionCommon.getRequestFromClient(
                req, null, data, DocumentEntity.class);
            if(commonDataClient.getUserInfor() !=null){
              return  CoreUtilsCommon.responseData(CoreErrorApp.ERR_NOSESSION, null, null);
            }
            DocumentEntity params = (DocumentEntity) commonDataClient.getParams();
            
            DocumentDao documentDao = new DocumentDao();
            DocumentEntity documentEntity = documentDao.getDetailDocument(
                    params.getDocument_receive_id());
            return CoreUtilsCommon.responseData(CoreErrorApp.SUCCESS, 
                        documentEntity , commonDataClient);
       
    }
}
