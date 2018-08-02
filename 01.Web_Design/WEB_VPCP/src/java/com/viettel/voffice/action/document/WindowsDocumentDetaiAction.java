/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.viettel.voffice.action.document;

import com.viettel.voffice.controller.DocumentController;
import com.viettel.voffice.entity.document.DocumentEntity;
import java.util.Map;
import org.zkoss.zk.ui.Component;
import org.zkoss.zk.ui.Executions;
import org.zkoss.zk.ui.Page;
import org.zkoss.zk.ui.metainfo.ComponentInfo;
import org.zkoss.zk.ui.select.SelectorComposer;

/**
 *
 * @author datnv5
 */
public class WindowsDocumentDetaiAction extends SelectorComposer<Component> {
    DocumentEntity documentEntity;
    @Override
    public final void doAfterCompose(Component comp) throws Exception {
        super.doAfterCompose(comp);
    } 
    
    @Override
    public ComponentInfo doBeforeCompose(Page page, Component parent, ComponentInfo compInfo) {
        Map<?, ?> arguments = Executions.getCurrent().getArg();
        Long documentReceiveId = (Long) arguments.get("idDocument");
        //lay thong tin chi tiet van ban
        DocumentController documentController = new DocumentController();
        documentEntity = documentController.getDetailDocument(documentReceiveId);
        return super.doBeforeCompose(page, parent, compInfo);
    }

    public DocumentEntity getDocumentEntity() {
        return documentEntity;
    }

    public void setDocumentEntity(DocumentEntity documentEntity) {
        this.documentEntity = documentEntity;
    }
}
