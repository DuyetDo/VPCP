/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.viettel.voffice.util;

import com.viettel.voffice.constants.StringConstants;
import com.viettel.voffice.database.entity.admin.UserInfoEntity;
import com.viettel.voffice.library.basecore.entity.CoreCommonEntity;
import com.viettel.voffice.library.basecore.entity.CoreUserEntity;
import com.viettel.voffice.library.basecore.security.CoreFuncSecurity;
import com.viettel.voffice.library.basecore.utils.CoreUtilsCommon;
import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import javax.servlet.http.HttpServletRequest;
import org.apache.log4j.Logger;
import org.apache.xml.security.utils.Base64;

/**
 *
 * @author datnv5
 */
public class FunctionCommon {
    private static final Logger LOGGER = Logger.getLogger(FunctionCommon.class);
    /**
     * Ho tro: kiem tra trang thai session thuc hien lay chuoi sessionid theo
     * trang thai dang nhap cua ca nhan
     *
     * @param httpRequest
     * @return
     */
    private static String getStrSessionIdByHttpRQ(HttpServletRequest httpRequest) {
        String sessionId;
        if (httpRequest.getHeader(StringConstants.Common.STR_SESSIONID) != null
                && !httpRequest.getHeader(StringConstants.Common.STR_SESSIONID).equals(
                        StringConstants.StringConstant.STR_EMTY)) {
            //lay session tu chuoi header "session_id"
            sessionId = httpRequest.getHeader(StringConstants.Common.STR_SESSIONID);
        } else if (httpRequest.getHeader(StringConstants.Common.STR_COOKIE) != null
                && !httpRequest.getHeader(StringConstants.Common.STR_COOKIE).equals(
                        StringConstants.StringConstant.STR_EMTY)) {
            //lay session tu chuoi header "session_id"
            sessionId = httpRequest.getHeader(StringConstants.Common.STR_COOKIE).
                    replace(StringConstants.Common.STR_JSESSIONID, StringConstants.StringConstant.STR_EMTY);
        } else {
            //lay session add vao header mac dinh
            sessionId = httpRequest.getRequestedSessionId();
        }
        return sessionId;
    }
    
    /**
     * Get data from mem
     * @param req
     * @param aesEncodeKey
     * @param data
     * @return 
     */
    public static UserInfoEntity getDataFromMem(HttpServletRequest req, 
            String aesEncodeKey, String data){
        String session = FunctionCommon.getStrSessionIdByHttpRQ(req);
        CoreCommonEntity commonEntity = 
                (CoreCommonEntity) CoreUtilsCommon.getDataCache_Mem(session,
                        CoreCommonEntity.class);
        String privateKey =  commonEntity.getPrivateKey();
        String aesKey = CoreFuncSecurity.decodeRSA(privateKey, aesEncodeKey, false);
        commonEntity.setAesKey(aesKey);
        UserInfoEntity result = new UserInfoEntity();
        result.setCoreCommonEntity(commonEntity);
        return result;
    }
    /**
     * dat gia tri vao mem
     * @param req
     * @param commonEntity
     * @return 
     */
    public static Boolean setDataFromMem(HttpServletRequest req, 
            Object commonEntity){
        String session = FunctionCommon.getStrSessionIdByHttpRQ(req);
        return CoreUtilsCommon.setDataCache_Mem(session, commonEntity);
    }

    /**
     * lay du lieu tu client gui len
     * @param req
     * @param aesEncodeKey
     * @param data
     * @param classOfT: danh sach cac doi client truyen len
     * @return 
     */
    public static CoreCommonEntity getRequestFromClient(
            HttpServletRequest req, String aesEncodeKey, String data,
            Class<?> classOfT) {
        CoreCommonEntity commonDataClient;
        if(aesEncodeKey != null && aesEncodeKey.trim().length() >0){
            //lan dau tien dang nhap phai lay key tu client len de giai ma
            UserInfoEntity userInfoEntity = FunctionCommon.getDataFromMem(
                req, aesEncodeKey, data);
             CoreCommonEntity coreCommonEntity =  userInfoEntity.getCoreCommonEntity();
             commonDataClient = CoreUtilsCommon.getRequestFromClient(
                 coreCommonEntity, data,  CoreUserEntity.class);
             commonDataClient.setAesKey(userInfoEntity.getCoreCommonEntity().getAesKey());
        }else{
            //goi session len de lay thong tin
            String sessionId = getStrSessionIdByHttpRQ(req);
            //lay thong tin da luu trong session
            UserInfoEntity userInfoEntity = (UserInfoEntity) 
                    CoreUtilsCommon.getDataCache_Mem(
                    sessionId,UserInfoEntity.class);
            CoreCommonEntity coreCommonEntity = userInfoEntity.getCoreCommonEntity();
            //lay dl client gui len
            commonDataClient = CoreUtilsCommon.getRequestFromClient(
                 coreCommonEntity, data,  classOfT);
            commonDataClient.setUserInfor(coreCommonEntity.getUserInfor());
        }
        return commonDataClient;
    }
    
    /**
     * ma hoa pass 1.0
     * @param plaintext
     * @return 
     */
    public synchronized static String encryptPass(String plaintext) {
        MessageDigest mdMessageDigest;
        String hash = null;
        try {
            mdMessageDigest = MessageDigest.getInstance("SHA-1"); // step 2
            mdMessageDigest.update(plaintext.getBytes("UTF-8")); // step 3
            byte raw[] = mdMessageDigest.digest(); // step 4
            hash = Base64.encode(raw); 
        } catch (NoSuchAlgorithmException | UnsupportedEncodingException e) {
              LOGGER.error("encrypt", e);
        } 
        return hash; 
    }
}
