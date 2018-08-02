/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.viettel.voffice.action.components.navbar;

/**
 *
 * @author datnv5
 */
public class TabInfo {
    Long id;
    int indexTab;
    String path;
    String title;
    Boolean selected;
    Boolean closeAble;
    String iconsclass;
    public TabInfo(Long id, String title, String path, String iconsclass) {
        super();
        this.id = id;
        this.title = title;
        this.path = path;
        this.iconsclass = iconsclass;
    }

    public Boolean getCloseAble() {
        return closeAble;
    }

    public void setCloseAble(Boolean closeAble) {
        this.closeAble = closeAble;
    }
    
    
    public String getIconsclass() {
        return iconsclass;
    }

    public void setIconsclass(String iconsclass) {
        this.iconsclass = iconsclass;
    }
    
    
    public int getIndexTab() {
        return indexTab;
    }

    public void setIndexTab(int indexTab) {
        this.indexTab = indexTab;
    }
    
    

    public Boolean getSelected() {
        return selected;
    }

    public void setSelected(Boolean selected) {
        this.selected = selected;
    }
    
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }
}
