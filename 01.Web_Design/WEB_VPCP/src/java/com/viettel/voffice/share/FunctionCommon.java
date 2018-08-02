/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.viettel.voffice.share;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import java.io.IOException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.nio.charset.Charset;
import java.security.SecureRandom;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Properties;
import java.util.Set;
import java.util.TreeMap;
import java.util.logging.Level;
import org.apache.log4j.Logger;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

/**
 *
 * @author datnv5
 */
public class FunctionCommon {
    private static final Logger LOGGER = Logger.getLogger(FunctionCommon.class);
    /**
     * createToken random
     * @return 
     */
    public static String createTokenRandom() {
        SecureRandom random = new SecureRandom();
        byte bytes[] = new byte[20];
        random.nextBytes(bytes);
        String token = Arrays.toString(bytes);
        return token;
    }
    /**
     * Convert tu hexString ra byte[]
     *
     * @param s
     * @return
     */
    public static byte[] hexStringToByteArray(String s) {
        int len = s.length();
        byte[] data = new byte[len / 2];
        for (int i = 0; i < len; i += 2) {
            data[i / 2] = (byte) ((Character.digit(s.charAt(i), 16) << 4)
                    + Character.digit(s.charAt(i + 1), 16));
        }
        return data;
    }

    /**
     * Convert tu bytes ra Hex
     *
     * @param bytes
     * @return
     */
    public static String bytesToHex(byte[] bytes) {
        char[] hexArray = "0123456789ABCDEF".toCharArray();
        char[] hexChars = new char[bytes.length * 2];
        for (int j = 0; j < bytes.length; j++) {
            int v = bytes[j] & 0xFF;
            hexChars[j * 2] = hexArray[v >>> 4];
            hexChars[j * 2 + 1] = hexArray[v & 0x0F];
        }
        return new String(hexChars);
    }
    
    /**
     * Loai bo khoang trang du thua
     *
     * @param str
     * @return
     */
    public static String trimspace(String str) {
        str = str.replaceAll("\\s+", " ");
        str = str.replaceAll("(^\\s+|\\s+$)", "");
        return str;
    }
    
    /**
     * lay ra khoang replace va ban ghi can thay the chu y: cau truc sql thay
     * the se phai thoa man dang where staffid in(:ListStaffId) and : cac ky tu
     * trong chuoi in phai sat canh nhau
     *
     * @param strSql
     * @param variale
     * @return
     */
    public static int[] getReplaceSqlInArr(String strSql, String variale) {
        int[] result = new int[4];
        int indext = strSql.indexOf(variale);
        int i = indext;
        int spase = 0;
        int end = indext + variale.length() + 1;
        //ket thuc ten cot can ghep dieu kien
        int charEnd = 0;
        int strInOrNotin = 0;
        int start = 0;
        while (true) {
            char a_char = strSql.charAt(i);

            if (a_char == ' ') {
                spase++;
            }
            if (spase == 1) {
                //gap khoang trong dau thi lay luon vi tri khoang trong
                charEnd = i;
                spase = 2;
            }
            if (spase == 3) {
                //gap khoang trong tiep theo thi danh dau vi tri dau can thay
                start = i;
                break;
            }
            i--;
            if (a_char == '(') {
                strInOrNotin = i;
            }
        }
        result[0] = start;
        result[1] = charEnd;
        result[2] = end;
        result[3] = strInOrNotin;
        return result;
    }
    
    /**
     * Kiem tra xem cot select trong database va class co cot tuong ung hay
     * khong
     *
     * @param rs
     * @param columnName
     * @return
     * @throws SQLException
     */
    public static boolean hasColumn(ResultSet rs, String columnName)
            throws SQLException {
        ResultSetMetaData rsmd = rs.getMetaData();
        int columns = rsmd.getColumnCount();
        for (int x = 1; x <= columns; x++) {
            String cl = rsmd.getColumnName(x);
            if (columnName.toLowerCase().equals(cl.toLowerCase())) {
                return true;
            }
        }
        return false;
    }
    
    /**
     * loai bo ky tu dac biet tim kiem sql
     *
     * @param input
     * @return
     */
    public static String escapeSql(String input) {
        String result = input.trim().replace("/", "//").replace("_", "/_").replace("%", "/%");
        return result;
    }
    
    /**
     * sap xep thu tu Hmap
     *
     * @param hmap
     * @return
     */
    public static List<String> sortHmap(HashMap<Integer, Object> hmap) {
        List<String> result = new ArrayList<>();
        if (hmap != null) {
            Map<Integer, Object> map = new TreeMap<>(hmap);
            Set set2 = map.entrySet();
            Iterator iterator2 = set2.iterator();

            while (iterator2.hasNext()) {
                Map.Entry me2 = (Map.Entry) iterator2.next();
                result.add(me2.getValue().toString());
            }

        }
        return result;
    }
    
    /**
     * Read a properties file from the classpath and return a Properties object
     *
     * @param filename
     * @return
     */
    static public Properties readProperties(String filename){
        try {
            Properties props = new Properties();
            ClassLoader loader = Thread.currentThread().getContextClassLoader();
            InputStream stream = loader.getResourceAsStream(filename);
            
            props.load(stream);
            return props;
        } catch (IOException ex) {
            LOGGER.error("Loi! readProperties ", ex);
        }
        return null;
    }
    
    /**
     * convert json to object
     *
     * @param strJsonData
     * @param classOfT
     * @return
     */
    public static Object convertJsonToObject(String strJsonData, Class<?> classOfT) {
        Object result = null;
        try {
            Gson gson
                = new GsonBuilder()
                .registerTypeAdapter(int.class, new GsonEmptyStringToNumber.EmptyStringToNumberTypeAdapter())
                .registerTypeAdapter(Integer.class, new GsonEmptyStringToNumber.EmptyStringToNumberTypeAdapter())
                .registerTypeAdapter(long.class, new GsonEmptyStringToNumber.EmptyStringToLongTypeAdapter())
                .registerTypeAdapter(Long.class, new GsonEmptyStringToNumber.EmptyStringToLongTypeAdapter())
                .registerTypeAdapter(double.class, new GsonEmptyStringToNumber.EmptyStringToDoubleTypeAdapter())
                .registerTypeAdapter(Double.class, new GsonEmptyStringToNumber.EmptyStringToDoubleTypeAdapter())
                .create();
            result = gson.fromJson(strJsonData, classOfT);
        } catch (Exception e) {
            LOGGER.error("Loi! convertJsonToObject ", e);
        }
        return result;
    }
    
     /**
     * convert json to listObject
     *
     * @param json
     * @param classOfT
     * @return
     */
    public static List<? extends Object> convertJsonToListObject(
            String json, Class<?> classOfT) {
        List<Object> result = new ArrayList<>();
        try {
            JSONArray jsonArray = new JSONArray(json);
            for (int i = 0; i < jsonArray.length(); i++) {
                JSONObject explrObject = jsonArray.getJSONObject(i);
                result.add(convertJsonToObject(explrObject.toString(), classOfT));
            }
        } catch (JSONException ex) {
            LOGGER.error("Loi! convertJsonToObject ", ex);
        }
        if(result.size() <= 0){
            result = null;
        }
        return result;
    }
    /**
     * charset utf 8 cho du lieu
     * @param strData
     * @return 
     */
    public static String charsetUTF8(String strData) {
        try {
            byte[] bytes = strData.getBytes("UTF-8");
            Charset UTF8_CHARSET = Charset.forName("UTF-8");
            return new String(bytes, UTF8_CHARSET);
        } catch (UnsupportedEncodingException ex) {
            LOGGER.error("Loi! charsetUTF8 ", ex);
            return strData;
        }
    }
}
