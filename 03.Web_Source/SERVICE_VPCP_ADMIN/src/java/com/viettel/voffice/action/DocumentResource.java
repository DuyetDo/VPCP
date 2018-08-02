/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.viettel.voffice.action;

import com.viettel.voffice.controller.DocumentController;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.FormParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

/**
 *
 * @author datnv5
 */
@Path("Document")
public class DocumentResource {
    /**
     * lay danhsach van ban nhan duoc tu ben ngoai
     * @param req
     * @param data
     * @return 
     */
    @POST
    @Path("getListDocumentReceive")
    @Produces(MediaType.APPLICATION_JSON)
    public String getListDocumentReceive(@Context HttpServletRequest req,
            @FormParam("data") String data) {
        DocumentController documentController = new DocumentController();
        return documentController.getListDocumentReceive(req, data);
    }
    
    @POST
    @Path("getDocumentDetail")
    @Produces(MediaType.APPLICATION_JSON)
    public String getDocumentDetail(@Context HttpServletRequest req,
            @FormParam("data") String data) {
        DocumentController documentController = new DocumentController();
        return documentController.getDocumentDetail(req, data);
    }
    
}