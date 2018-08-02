/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.viettel.voffice.action.admin;

import org.zkoss.zul.DefaultTreeNode;

/**
 *
 * @author datnv5
 */
public class TreeNodeModel  extends DefaultTreeNode {
    private boolean open;
 
    public TreeNodeModel(Object data, DefaultTreeNode[] children, boolean open) {
        super(data, children);
        this.open = open;
    }
 
    public TreeNodeModel(Object data, DefaultTreeNode[] children) {
        super(data, children);
    }
 
    public TreeNodeModel(Object data) {
        super(data);
    }

 
    public boolean isOpen() {
        return open;
    }
 
    public void setOpen(boolean open) {
        this.open = open;
    }
}