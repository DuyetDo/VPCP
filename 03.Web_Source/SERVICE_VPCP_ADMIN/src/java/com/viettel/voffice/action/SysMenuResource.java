/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.viettel.voffice.action;

import com.viettel.voffice.controller.SysMenuController;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.FormParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

/**
 * Lay danh sach menu
 * @author datnv5
 */
@Path("SysMenu")
public class SysMenuResource {
    @POST
    @Path("getListMenu")
    @Produces(MediaType.APPLICATION_JSON)
    public String getListMenu(@Context HttpServletRequest req,
            @FormParam("data") String data) {
        SysMenuController sysMenuController = new SysMenuController();
        return sysMenuController.getMenuFromIdParent(req, data);
    }
}
