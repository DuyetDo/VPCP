/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.viettel.voffice.controller;

import com.viettel.voffice.database.DAO.user.UserDao;
import com.viettel.voffice.database.entity.admin.UserInfoEntity;
import com.viettel.voffice.library.basecore.entity.CoreCommonEntity;
import com.viettel.voffice.library.basecore.entity.CoreErrorApp;
import com.viettel.voffice.library.basecore.entity.CoreUserEntity;
import com.viettel.voffice.library.basecore.security.CoreFuncSecurity;
import com.viettel.voffice.library.basecore.security.RSA;
import com.viettel.voffice.library.basecore.utils.CoreUtilsCommon;
import com.viettel.voffice.util.FunctionCommon;
import javax.servlet.http.HttpServletRequest;
/**
 *
 * @author nguyendat
 */
public class AuthenController {
    /**
     * get rsa public key hand catch
     * @param req
     * @return 
     */
    public String getRsaPublicKey(HttpServletRequest req) {
        RSA keyRsa = CoreFuncSecurity.getKeyRsa();
        String sessionOld = req.getSession().getId();
        CoreUtilsCommon.removeDataCache_Mem(sessionOld);
        req.getSession(true).invalidate();
        String session = req.getSession(true).getId();
        CoreCommonEntity commonEntity = new CoreCommonEntity();
        String strPublicKeyRsa = CoreUtilsCommon.bytesToHex(keyRsa.getPublic_Key().getEncoded());
        String strPrivateKeyRsa = CoreUtilsCommon.bytesToHex(keyRsa.getPrivate_Key().getEncoded());
        commonEntity.setPublicKey(strPublicKeyRsa);
        commonEntity.setPrivateKey(strPrivateKeyRsa);
        CoreUtilsCommon.setDataCache_Mem(session, commonEntity);
        commonEntity.setPrivateKey("");
        return CoreUtilsCommon.responseData(CoreErrorApp.SUCCESS, commonEntity, null);
    }
    
    /**
     * thuc hien login he thong
     * @param req
     * @param aesEncodeKey
     * @param data
     * @return 
     */
    public String login(HttpServletRequest req, 
            String aesEncodeKey, String data) {
        CoreCommonEntity commonDataClient = FunctionCommon.getRequestFromClient(
                req, aesEncodeKey, data, null);
        CoreUserEntity paramsObj = (CoreUserEntity) commonDataClient.getParams();
        UserDao userDao = new UserDao();
        
        UserInfoEntity userInfo = userDao.getDataLogin(paramsObj.getUserName()
                , paramsObj.getPassWord());
        //tra ve ket qua kiem tra nguoi dung trong du lieu
        if(userInfo == null){
            return  CoreUtilsCommon.responseData(CoreErrorApp.DATABASE, null, null);
        }else{
//            commonDataClient.setUserInfor(userInfo.getCoreUserEntity());
            commonDataClient.setUserInfor(userInfo.getCoreCommonEntity().getUserInfor());
            userInfo.setCoreCommonEntity(commonDataClient);
            FunctionCommon.setDataFromMem(req, userInfo);
            return CoreUtilsCommon.responseData(CoreErrorApp.SUCCESS, 
                    userInfo , commonDataClient);
        }
    }
}
