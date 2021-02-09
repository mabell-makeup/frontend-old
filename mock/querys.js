// すぐに使いそうなのでコメントアウトにしておく。不要であれば消してもOK。
// export const getSuggestionItems = /\{suggestionItems\(item_name:".+",limit:20\)\{item_idbrand_nameitem_name\}\}/
export const getSuggestionKeywords = /\{suggestionKeywords\(keyword:".+",limit:10\)\{keyword\}\}/
export const getTrendKeywords = /\{trendKeywords\(limit:10\)\{keyword\}\}/
export const getPostsByConditions = /queryListPostTypes\(\$filter:TablePostTypeFilterInput\$limit:Int\$nextToken:String\)\{listPostTypes\(filter:\$filter,limit:\$limit,nextToken:\$nextToken\)\{items\{post_iduser_idimg_src_listthumbnail_img_srcitemstagsdescriptionpage_viewslike_countbase_colorseasonface_typecolorcountrypartsproducts_idmakeup_categoriesis_glitteryDateTimeage\}nextToken\}\}/
export const queryListPostTypes = /queryListPostTypes\(\$filter:TablePostTypeFilterInput\$limit:Int\$nextToken:String\)\{listPostTypes\(filter:\$filter,limit:\$limit,nextToken:\$nextToken\)\{items\{post_iduser_idimg_src_listthumbnail_img_srcitemstagsdescriptionpage_viewslike_countbase_colorseasonface_typecolorcountrypartsproducts_idmakeup_categoriesis_glitteryDateTimeage\}nextToken\}\}/
export const getPostDetail = /\{post\(id:.+\)\{user_iduser_nameimg_src_listitemstagsdescriptionpage_views\}\}/
export const updateFavoritePost = /\{updateFavoritePost\(post_id:.+,handle:.+\)\{result\}\}/
export const getItems = /\{fetchItems\(productId:.+\)\{items:\{idnamebrand_namecategorypricerelease_date\}\}\}/
export const queryGetMasterType = /\(\$id:ID!\)\{getMasterType\(id:\$id\)\{idmakeup_categoriescolorcountrybase_colorseasonface_type\}\}/