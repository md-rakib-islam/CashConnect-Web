const categoryDatas = [{ id: 1, parent_category: null, created_by: "tahsanahsan947@gmail.com", updated_by: "tahsanahsan947@gmail.com", name: "Category_a" },
{ id: 3, parent_category: "Category_a", created_by: "tahsanahsan947@gmail.com", updated_by: null, name: "Category_a>1" },
{ id: 5, parent_category: "Category_a>1", created_by: "tahsanahsan947@gmail.com", updated_by: null, name: "Category_a>1>2" },
{ id: 2, parent_category: "Category_a", created_by: "tahsanahsan947@gmail.com", updated_by: null, name: "Category_b" },
{ id: 4, parent_category: "Category_b", created_by: "tahsanahsan947@gmail.com", updated_by: null, name: "Category_b>1" },
{ id: 1, parent_category: null, created_by: "tahsanahsan947@gmail.com", updated_by: "tahsanahsan947@gmail.com", name: "Category_C" },
]



function useFormattedCategoryData(categoryData) {
    let parent = {
        icon: "dress",
        title: "data.name",
        href: `/product/search/${"data.id"}`,
        menuComponent: "MegaMenu1",
        menuData: []
    }
    const formattedCategoryData = categoryData.map(data => {
        parent = []
        let newParent = {
            icon: "dress",
            title: data.name,
            href: `/product/search/${data.id}`,
            menuComponent: "MegaMenu1",
            menuData: []
        }
        if (data.parent_category) {
            newParent.menuData = {
                categories: [
                    {
                        title: data.parent_category,
                        href: `/product/search/${data.id}`,
                    }
                ]
            }
        }
        parent = newParent

        return parent

    }
    )

    console.log("categoryDataFormatted", parent)

    return [formattedCategoryData];
}

export default useFormattedCategoryData;
