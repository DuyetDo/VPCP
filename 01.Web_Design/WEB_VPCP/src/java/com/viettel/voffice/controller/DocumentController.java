/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.viettel.voffice.controller;

import com.viettel.voffice.entity.admin.SysMenuEntity;
import com.viettel.voffice.entity.document.DocumentEntity;
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
 * @author datnv5
 */
public class DocumentController {
    
    public List<DocumentEntity> getListDocumentReceive() {
            HttpSession session = (HttpSession)
                    (Executions.getCurrent()).getDesktop().getSession().getNativeSession();
            CoreDataResponseEntity sysUserEntity =
                    (CoreDataResponseEntity) Sessions.getCurrent().getAttribute(session.getId());
            
            CoreLibWebCommon libWebCommon = new CoreLibWebCommon();
            Map<String, Object> params = new LinkedHashMap<>();
            params.put("name", "khong hieu noi du lieu");
            CoreDataResponseEntity coreDataResponseEntity
                    = libWebCommon.requestDataToServer("Document.getListDocumentReceive", params, sysUserEntity);
            String strDataList =  coreDataResponseEntity.getData();

            List<DocumentEntity> listResult = (List<DocumentEntity>) FunctionCommon.convertJsonToListObject(
                   strDataList, DocumentEntity.class);
            
            return listResult;
    }

    /**
     * lay thong tin chi tiet van ban
     * @param documentReceiveId
     * @return 
     */
    public DocumentEntity getDetailDocument(Long documentReceiveId) {
        HttpSession session = (HttpSession)
                (Executions.getCurrent()).getDesktop().getSession().getNativeSession();
        CoreDataResponseEntity sysUserEntity =
                (CoreDataResponseEntity) Sessions.getCurrent().getAttribute(session.getId());

        CoreLibWebCommon libWebCommon = new CoreLibWebCommon();
        Map<String, Object> params = new LinkedHashMap<>();
        params.put("document_receive_id", documentReceiveId);
        CoreDataResponseEntity coreDataResponseEntity
                = libWebCommon.requestDataToServer("Document.getDocumentDetail", params, sysUserEntity);
        String strDataList =  coreDataResponseEntity.getData();

        DocumentEntity documentEntity = (DocumentEntity) FunctionCommon.convertJsonToObject(
               strDataList, DocumentEntity.class);
        return documentEntity;
    }
}
