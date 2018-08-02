/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.viettel.voffice.action.document;

import com.viettel.voffice.controller.DocumentController;
import com.viettel.voffice.entity.document.DocumentEntity;
import com.viettel.voffice.share.Constants;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.zkoss.bind.annotation.BindingParam;
import org.zkoss.bind.annotation.Command;
import org.zkoss.bind.annotation.NotifyChange;
import org.zkoss.zk.ui.*;
import org.zkoss.zk.ui.select.*;
import org.zkoss.zk.ui.util.Clients;
import org.zkoss.zul.Window;

/**
 *
 * @author datnv5
 */
public class DocumentInsideAction extends SelectorComposer<Component> {
     int pageSize = 10;
   int activePage = 0;
   @NotifyChange("zipcodes")
   public void setActivePage(int activePage)
   {
     Clients.showNotification("setActivePage!" + activePage);
     this.activePage = activePage;
     
   }
 
    public long getTotalSize()
    {
      return 150L;
    }

    public Integer getPageSize()
    {
      return pageSize;
    }
    
    
    @Command("selectedItem")
    public void selectnode(@BindingParam("selectId") Long selectId) {
        Map args = new HashMap();
        args.put("idDocument", selectId);
        Window window = (Window) Executions.createComponents(
                Constants.LinkPages.WINDOWS_DOCUMENTDETAIL, null, args);
        window.setTitle("Thông tin chi tiết văn bản");
        window.doModal();
    }
    
    public List<DocumentEntity> getDocumentListOutside() {
        
        DocumentController documentController = new DocumentController();
        
        List<DocumentEntity> result;
        result = documentController.getListDocumentReceive();
        System.out.println(result);
        return result;
    }
     
    
}
