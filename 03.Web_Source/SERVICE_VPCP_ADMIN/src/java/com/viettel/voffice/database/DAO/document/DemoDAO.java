/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.viettel.voffice.database.DAO.document;

import com.viettel.voffice.constants.StringConstants;
import com.viettel.voffice.database.entity.document.Demo;
import com.viettel.voffice.library.basecore.database.CoreFuncDataBaseDAO;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author Administrator
 */
public class DemoDAO {
    public List<Demo> getList()
    {
        StringBuilder sqlBuilder = new StringBuilder();
        sqlBuilder.append("SELECT * FROM test");
        
       CoreFuncDataBaseDAO repo = new CoreFuncDataBaseDAO();
        List<Demo> lst = (List<Demo>) repo.getListRecord(sqlBuilder, null,
                null, null, Demo.class);
        return lst;
}
 
     public Demo getDetailDemo(Long id) {
        StringBuilder sqlBuilder = new StringBuilder();

        sqlBuilder.append(" select * from test where id=?");
        List<Object> params = new ArrayList<>();
        params.add(id);
        CoreFuncDataBaseDAO repo = new CoreFuncDataBaseDAO();
        List<Demo> lst = (List<Demo>) repo.getListRecord(sqlBuilder, params,
                null, null, Demo.class);
        if (lst != null && lst.size() > 0) {
            return lst.get(0);
        } else {
            return null;
        }
    }
     public void add(Demo demo)
     {
        StringBuilder sqlBuilder = new StringBuilder();
        demo.setId(createSequence(StringConstants.SEQUENCE_TEST));
        sqlBuilder.append("insert into test (id,username,password) VALUES (?,?,?)");
        List<Object> params = new ArrayList<>();
        params.add(demo.getId());
        params.add(demo.getUsername());
        params.add(demo.getPassword());
        CoreFuncDataBaseDAO repo = new CoreFuncDataBaseDAO();
       repo.insertOrUpdateDataBase(sqlBuilder,params);
     }
      public static void main(String[] args) {
        DemoDAO s=new DemoDAO();
     //   System.out.println(s.add(new Demo(6,"aa","dd")));
          System.out.println(s.getList().size());
    }

    public List<Demo> search(String data) {
         StringBuilder sqlBuilder = new StringBuilder();
        sqlBuilder.append("SELECT * FROM test");
        if (!"".equalsIgnoreCase(data) && data != null) {
            sqlBuilder.append(" WHERE UPPER(USERNAME) LIKE UPPER(?) ");
        }
        List<Object> params = new ArrayList<>();
        if (!"".equalsIgnoreCase(data) && data != null) {
            params.add("%"+data+"%");
        }
       CoreFuncDataBaseDAO repo = new CoreFuncDataBaseDAO();
        List<Demo> lst = (List<Demo>) repo.getListRecord(sqlBuilder, params,
                null, null, Demo.class);
        return lst;
    }

    public boolean update(Demo demo) {
        StringBuilder sqlBuilder = new StringBuilder();
        sqlBuilder.append("UPDATE test t SET T.USERNAME = ?,T.PASSWORD = ? where T.ID = ?");
        List<Object> params = new ArrayList<>();
        params.add(demo.getUsername());
        params.add(demo.getPassword());
        params.add(demo.getId());
        CoreFuncDataBaseDAO repo = new CoreFuncDataBaseDAO();
        return repo.insertOrUpdateDataBase(sqlBuilder,params);
    }
    public Long createSequence(String nameSQ) {
        StringBuilder builder = new StringBuilder("SELECT "+nameSQ+".nextval FROM dual");
        CoreFuncDataBaseDAO repo = new CoreFuncDataBaseDAO();
        BigDecimal seq = (BigDecimal) repo.getFistOnlyValue(builder, null);
        return seq.longValue();
    }
}
