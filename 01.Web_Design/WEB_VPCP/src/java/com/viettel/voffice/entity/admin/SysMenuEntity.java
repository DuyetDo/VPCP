/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.viettel.voffice.entity.admin;

/**
 *
 * @author datnv5
 */
public class SysMenuEntity {

    Long id;
    Long parent_id;
    String name;
    String url_page_link;
    String iconsclass;
    String description;
    int active;
    int showallpeople;
    int isleaf;

    public SysMenuEntity(Long id, Long parent_id, String name,
            String url_page_link, String iconsclass, String description,
            int active, int showallpeople, int isleaf) {
        this.id = id;
        this.parent_id = parent_id;
        this.name = name;
        this.url_page_link = url_page_link;
        this.iconsclass = iconsclass;
        this.description = description;
        this.active = active;
        this.showallpeople = showallpeople;
        this.isleaf = isleaf;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getParent_id() {
        return parent_id;
    }

    public void setParent_id(Long parent_id) {
        this.parent_id = parent_id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUrl_page_link() {
        return url_page_link;
    }

    public void setUrl_page_link(String url_page_link) {
        this.url_page_link = url_page_link;
    }

    public String getIconsclass() {
        return iconsclass;
    }

    public void setIconsclass(String iconsclass) {
        this.iconsclass = iconsclass;
    }

    public int getActive() {
        return active;
    }

    public void setActive(int active) {
        this.active = active;
    }

    public int getShowallpeople() {
        return showallpeople;
    }

    public void setShowallpeople(int showallpeople) {
        this.showallpeople = showallpeople;
    }

    public int getIsleaf() {
        return isleaf;
    }

    public void setIsleaf(int isleaf) {
        this.isleaf = isleaf;
    }
}
