
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.viettel.voffice.database.DAO.document;

import com.viettel.voffice.database.entity.document.DocumentEntity;
import com.viettel.voffice.library.basecore.database.CoreFuncDataBaseDAO;
import com.viettel.voffice.library.basecore.entity.CoreUserEntity;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author datnv5
 */
public class DocumentDao {

    /**
     *
     * @param userEntity
     * @return
     */
    public List<DocumentEntity> getListDocumentReceive(CoreUserEntity userEntity) {
        StringBuilder sqlBuilder = new StringBuilder();
        sqlBuilder.append(" SELECT DISTINCT FIRST_VALUE (p.send_date) OVER (PARTITION BY p.book_document_id ORDER BY p.process_id DESC) send_date, ");
        sqlBuilder.append(" d.document_receive_id, d.document_code, bd.create_time, d.publish_date, o.office_name,");
        sqlBuilder.append(" d.signer, d.abstract, Min(p.deadline) Over (Partition By p.book_document_id ORDER BY p.process_id DESC) as deadline,");
        sqlBuilder.append(" d.status, bd.book_number, d.send_packing, bd.book_document_id, ");
        sqlBuilder.append(" bd.modified_by_dept_id, bd.security_Name, bd.priority_Name, p.reminder_flag,");
        sqlBuilder.append(" dept.dept_name, FIRST_VALUE (p.node_id) OVER (PARTITION BY p.book_document_id ORDER BY p.process_id DESC) node_id");
        sqlBuilder.append(" ,FIRST_VALUE (p.status) OVER (PARTITION BY p.book_document_id ORDER BY p.process_id DESC) process_status, bd.book_number_parent");
        sqlBuilder.append(" FROM (document_receive d LEFT JOIN outside_office o ON d.publish_agent_outside_id = o.office_id");
        sqlBuilder.append(" LEFT JOIN department dept ON d.publish_agent_inside_id = dept.dept_id),");
        sqlBuilder.append(" (process_doc_in p left join (AUTHORITY_DETAIL adl inner join AUTHORITY au on adl.AUTHORITY_ID = au.AUTHORITY_ID) ");
        sqlBuilder.append(" on p.AUTHORITY_DETAIL_ID=adl.AUTHORITY_DETAIL_ID), book_document bd ");
        sqlBuilder.append(" WHERE p.book_document_id = bd.book_document_id ");
        sqlBuilder.append(" AND p.object_id = d.document_receive_id ");
        sqlBuilder.append(" AND p.OBJECT_ID  in (select DISTINCT p1.OBJECT_ID from process_doc_in p1 ");
        sqlBuilder.append(" where p1.OBJECT_ID= p.OBJECT_ID  and p1.RECEIVE_USER_ID = ?)");
        //sqlBuilder.append(" AND process_type NOT IN (2,3,6) AND p.status IN (2,7,9) ");
        sqlBuilder.append(" AND NOT EXISTS (SELECT p2.process_id ");
        sqlBuilder.append(" FROM PROCESS_DOC_IN p2 WHERE p2.is_active = 1    AND p2.process_type NOT IN (3,2,6) ");
        sqlBuilder.append(" AND p2.object_id = p.object_id AND p2.book_document_id = p.book_document_id ");
        sqlBuilder.append(" AND p2.status IN (0,1,15) ");
        sqlBuilder.append(" AND p2.RECEIVE_USER_ID = ?  ");
        sqlBuilder.append(" )");

        List<Object> params = new ArrayList<>();
        params.add(userEntity.getUserId());
        params.add(userEntity.getUserId());
        CoreFuncDataBaseDAO repo = new CoreFuncDataBaseDAO();
        List<DocumentEntity> lst = (List<DocumentEntity>) repo.getListRecord(sqlBuilder, params,
                null, null, DocumentEntity.class);
        return lst;
    }

    public static void main(String[] args) {
        DocumentDao documentDao = new DocumentDao();
        DocumentEntity aa = documentDao.getDetailDocument(1210L);
        System.out.println("aa" + aa);
    }

    /**
     * lay chi tiet van ban
     *
     * @param document_receive_id
     * @return
     */
    public DocumentEntity getDetailDocument(Long document_receive_id) {
        StringBuilder sqlBuilder = new StringBuilder();
//        sqlBuilder.append("select document_receive_id,document_code,signer,publish_date,absTract,number_of_doc,number_of_page from DOCUMENT_RECEIVE where DOCUMENT_RECEIVE_ID = ?");
        sqlBuilder.append(" SELECT DISTINCT FIRST_VALUE (p.send_date) OVER (PARTITION BY p.book_document_id ORDER BY p.process_id DESC) send_date, ");
        sqlBuilder.append(" d.document_receive_id, d.document_code, bd.create_time, d.publish_date, o.office_name, ");
        sqlBuilder.append("  d.signer, d.abstract, Min(p.deadline) Over (Partition By p.book_document_id ORDER BY p.process_id DESC) as deadline, ");
        sqlBuilder.append("  d.status, bd.book_number, d.send_packing, bd.book_document_id,  ");
        sqlBuilder.append(" bd.modified_by_dept_id, bd.security_Name, bd.priority_Name, p.reminder_flag, ");
        sqlBuilder.append("  dept.dept_name, FIRST_VALUE (p.node_id) OVER (PARTITION BY p.book_document_id ORDER BY p.process_id DESC) node_id ");
        sqlBuilder.append("  ,FIRST_VALUE (p.status) OVER (PARTITION BY p.book_document_id ORDER BY p.process_id DESC) process_status, bd.book_number_parent ");
        sqlBuilder.append(" FROM (document_receive d LEFT JOIN outside_office o ON d.publish_agent_outside_id = o.office_id ");
        sqlBuilder.append("  LEFT JOIN department dept ON d.publish_agent_inside_id = dept.dept_id), ");
        sqlBuilder.append("  (process_doc_in p left join (AUTHORITY_DETAIL adl inner join AUTHORITY au on adl.AUTHORITY_ID = au.AUTHORITY_ID)  ");
        sqlBuilder.append("  on p.AUTHORITY_DETAIL_ID=adl.AUTHORITY_DETAIL_ID), book_document bd  ");
        sqlBuilder.append("  WHERE p.book_document_id = bd.book_document_id  ");
        sqlBuilder.append(" AND p.object_id = d.document_receive_id  ");
        sqlBuilder.append(" AND p.OBJECT_ID  in (select DISTINCT p1.OBJECT_ID from process_doc_in p1  ");
        sqlBuilder.append(" where p1.OBJECT_ID= p.OBJECT_ID)");
//        sqlBuilder.append(" AND process_type NOT IN (2,3,6) AND p.status IN (2,7,9)");
//        sqlBuilder.append(" AND NOT EXISTS (SELECT p2.process_id  ");
//        sqlBuilder.append("  FROM PROCESS_DOC_IN p2 WHERE p2.is_active = 1    AND p2.process_type NOT IN (3,2,6) ");
//        sqlBuilder.append("  AND p2.object_id = p.object_id AND p2.book_document_id = p.book_document_id  ");
//        sqlBuilder.append("  AND p2.status IN (0,1,15))");
        sqlBuilder.append("  and d.document_receive_id = ?");

        List<Object> params = new ArrayList<>();
        params.add(document_receive_id);
        CoreFuncDataBaseDAO repo = new CoreFuncDataBaseDAO();
        List<DocumentEntity> lst = (List<DocumentEntity>) repo.getListRecord(sqlBuilder, params,
                null, null, DocumentEntity.class);
        if (lst != null && lst.size() > 0) {
            return lst.get(0);
        } else {
            return null;
        }
    }
}
