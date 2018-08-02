/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.viettel.voffice.action;

import com.viettel.voffice.controller.AuthenController;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.FormParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

/**
 * REST Web Service
 *
 * @author nguyendat
 */
@Path("Authen")
public class AuthenResource {
    /**
     * Lay thong tin bat tay ban dau
     * 
     * @param req
     * @return 
     */
    @POST
    @Path("getRsaKeyPublic")
    @Produces(MediaType.APPLICATION_JSON)
    public String getRsaPublicKey(@Context HttpServletRequest req) {
        AuthenController authenController = new AuthenController();
        String strDataResponse = authenController.getRsaPublicKey(req);
        return strDataResponse;
    }
    
    @POST
    @Path("login")
    @Produces(MediaType.APPLICATION_JSON)
    public String login(@Context HttpServletRequest req,
            @FormParam("aesEncodeKey") String aesEncodeKey,
            @FormParam("data") String data) {
        AuthenController authenController = new AuthenController();
        String strDataResponse = authenController.login(req, aesEncodeKey, data);
        return strDataResponse;
    }
    
}
