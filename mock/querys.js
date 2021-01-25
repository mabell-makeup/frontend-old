// すぐに使いそうなのでコメントアウトにしておく。不要であれば消してもOK。
// export const getSuggestionItems = /\{suggestionItems\(item_name:".+",limit:20\)\{item_idbrand_nameitem_name\}\}/
export const getSuggestionKeywords = /\{suggestionKeywords\(keyword:".+",limit:10\)\{keyword\}\}/
export const getTrendKeywords = /\{trendKeywords\(limit:10\)\{keyword\}\}/
export const getPostsByConditions = /\{posts\(.*\)\{post_idthumbnail_img_src\}\}/
export const getTrendPosts = /\{posts\(order:DESC\)\{post_idthumbnail_img_src\}\}/
export const getPostDetail = /\{post\(id:.+\)\{user_iduser_nameimg_src_listitemstagsdescriptionpage_views\}\}/
export const updateFavoritePost = /\{updateFavoritePost\(post_id:.+,handle:.+\)\{result\}\}/
export const getItems = /\{fetchItems\(productId:.+\)\{items:\{idnamebrand_namecategorypricerelease_date\}\}\}/