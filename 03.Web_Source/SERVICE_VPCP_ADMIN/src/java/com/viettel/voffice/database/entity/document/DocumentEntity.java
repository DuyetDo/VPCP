/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.viettel.voffice.database.entity.document;


/**
 *
 * @author datnv5
 */
public class DocumentEntity {
    String send_date;
    Long document_receive_id;
    String document_code;
    String create_time;
    String publish_date;
    String office_name;
    String signer;
    String absTract;
    String deadline;
    int status;
    String book_number;
    String send_packing;
    Long book_document_id;
    Long modified_by_dept_id;
    String security_Name;
    String priority_Name;
    int reminder_flag;
    String dept_name;
    Long node_id;
    Long process_status;
    String book_number_parent;
    String number_of_doc;
    String number_of_page;
    
    public String getSend_date() {
        return send_date;
    }

    public void setSend_date(String send_date) {
        this.send_date = send_date;
    }

    public Long getDocument_receive_id() {
        return document_receive_id;
    }

    public void setDocument_receive_id(Long document_receive_id) {
        this.document_receive_id = document_receive_id;
    }

    public String getDocument_code() {
        return document_code;
    }

    public void setDocument_code(String document_code) {
        this.document_code = document_code;
    }

    public String getCreate_time() {
        return create_time;
    }

    public void setCreate_time(String create_time) {
        this.create_time = create_time;
    }

    public String getPublish_date() {
        return publish_date;
    }

    public void setPublish_date(String publish_date) {
        this.publish_date = publish_date;
    }

    public String getOffice_name() {
        return office_name;
    }

    public void setOffice_name(String office_name) {
        this.office_name = office_name;
    }

    public String getSigner() {
        return signer;
    }

    public void setSigner(String signer) {
        this.signer = signer;
    }

    public String getAbsTract() {
        return absTract;
    }

    public void setAbsTract(String absTract) {
        this.absTract = absTract;
    }

    public String getDeadline() {
        return deadline;
    }

    public void setDeadline(String deadline) {
        this.deadline = deadline;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getBook_number() {
        return book_number;
    }

    public void setBook_number(String book_number) {
        this.book_number = book_number;
    }

    public String getSend_packing() {
        return send_packing;
    }

    public void setSend_packing(String send_packing) {
        this.send_packing = send_packing;
    }

    public Long getBook_document_id() {
        return book_document_id;
    }

    public void setBook_document_id(Long book_document_id) {
        this.book_document_id = book_document_id;
    }

    public Long getModified_by_dept_id() {
        return modified_by_dept_id;
    }

    public void setModified_by_dept_id(Long modified_by_dept_id) {
        this.modified_by_dept_id = modified_by_dept_id;
    }

    public String getSecurity_Name() {
        return security_Name;
    }

    public void setSecurity_Name(String security_Name) {
        this.security_Name = security_Name;
    }

    public String getPriority_Name() {
        return priority_Name;
    }

    public void setPriority_Name(String priority_Name) {
        this.priority_Name = priority_Name;
    }

    public int getReminder_flag() {
        return reminder_flag;
    }

    public void setReminder_flag(int reminder_flag) {
        this.reminder_flag = reminder_flag;
    }

    public String getDept_name() {
        return dept_name;
    }

    public void setDept_name(String dept_name) {
        this.dept_name = dept_name;
    }

    public Long getNode_id() {
        return node_id;
    }

    public void setNode_id(Long node_id) {
        this.node_id = node_id;
    }

    public Long getProcess_status() {
        return process_status;
    }

    public void setProcess_status(Long process_status) {
        this.process_status = process_status;
    }

    public String getBook_number_parent() {
        return book_number_parent;
    }

    public void setBook_number_parent(String book_number_parent) {
        this.book_number_parent = book_number_parent;
    }

    public String getNumber_of_doc() {
        return number_of_doc;
    }

    public void setNumber_of_doc(String number_of_doc) {
        this.number_of_doc = number_of_doc;
    }

    public String getNumber_of_page() {
        return number_of_page;
    }

    public void setNumber_of_page(String number_of_page) {
        this.number_of_page = number_of_page;
    }
    
    
    
}
