/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.viettel.voffice.action;

import com.viettel.voffice.controller.DemoController;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.FormParam; 
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

/**
 *
 * @author Administrator
 */
@Path("demo")
public class DemoResource {
//     @POST
//    @Path("list")
//    @Produces(MediaType.APPLICATION_JSON)
//    public String getListMenu(@Context HttpServletRequest req,
//            @FormParam("data") String data) {
//        DemoController sysMenuController = new DemoController();
//        return sysMenuController.getListDemo(req, data);
//    }
    @POST
    @Path("list")
    @Produces(MediaType.APPLICATION_JSON)
    public String getListDemo(@Context HttpServletRequest req,
            @FormParam("data") String data) {
        DemoController sysMenuController = new DemoController();
        return sysMenuController.getList(req, data);
    }
    @POST
    @Path("chitiet")
    @Produces(MediaType.APPLICATION_JSON)
    public String getDetail(@Context HttpServletRequest req,
            @FormParam("data") String data) {
        DemoController sysMenuController = new DemoController();
        return sysMenuController.getDemoDetail(req, data);
    }
    @POST
    @Path("search")
    @Produces(MediaType.APPLICATION_JSON)
    public String search(@Context HttpServletRequest req,
            @FormParam("data") String data) {
        DemoController sysMenuController = new DemoController();
        return sysMenuController.search(req, data);
    }
    @POST
    @Path("add")
    @Produces(MediaType.APPLICATION_JSON)
    public String add(@Context HttpServletRequest req,
            @FormParam("data")  String data) {
        DemoController sysMenuController = new DemoController();
        String strSysController = sysMenuController.addOrUpdate(req, data);
        return strSysController;
    }
}
