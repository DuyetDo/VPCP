package com.viettel.voffice.action.components.navbar;

public abstract class NavigationPage {

    private final Long id;
    private final Long parent_id;
    private final String title;
    private final String url_page_link;
    private final String iconsclass;

    public NavigationPage(Long parent_id, Long id, String title,
            String url_page_link, String iconsclass) {
        super();
        this.id = id;
        this.parent_id = parent_id;
        this.title = title;
        this.url_page_link = url_page_link;
        this.iconsclass = iconsclass;
    }

    public abstract boolean isSelected();

    public String getIconsclass() {
        return iconsclass;
    }

    
    public Long getParent_id() {
        return parent_id;
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getUrl_page_link() {
        return url_page_link;
    }

}
