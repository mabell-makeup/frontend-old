/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getPostType = /* GraphQL */ `
  query GetPostType($post_id: ID!, $DateTime: AWSDateTime!) {
    getPostType(post_id: $post_id, DateTime: $DateTime) {
      post_id
      user_id
      img_src_list
      thumbnail_img_src
      tags
      description
      page_views
      like_count
      base_color
      season
      face_type
      color
      country
      products_id
      makeup_categories
      glitter
      DateTime
    }
  }
`;
export const listPostTypes = /* GraphQL */ `
  query ListPostTypes(
    $filter: TablePostTypeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPostTypes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        post_id
        user_id
        img_src_list
        thumbnail_img_src
        tags
        description
        page_views
        like_count
        base_color
        season
        face_type
        color
        country
        parts
        products_id
        makeup_categories
        glitter
        DateTime
      }
      nextToken
    }
  }
`;
export const queryPostTypesByViewRank = /* GraphQL */ `
  query QueryPostTypesByViewRank($post_id: ID!, $first: Int, $after: String) {
    queryPostTypesByViewRank(post_id: $post_id, first: $first, after: $after) {
      items {
        post_id
        user_id
        img_src_list
        thumbnail_img_src
        tags
        description
        page_views
        like_count
        base_color
        season
        face_type
        skin_type
        color
        country
        parts
        products_id
        makeup_categories
        glitter
        DateTime
      }
      nextToken
    }
  }
`;
export const getUserType = /* GraphQL */ `
  query GetUserType($user_id: ID!) {
    getUserType(user_id: $user_id) {
      user_id
      name
      nickname
      base_color
      season
      face_type
      thumbnail_img_src
      skin_type
      self_introduction
    }
  }
`;
export const listUserTypes = /* GraphQL */ `
  query ListUserTypes(
    $filter: TableUserTypeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserTypes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        user_id
        name
        nickname
        base_color
        season
        face_type
        skin_type
        self_introduction
      }
      nextToken
    }
  }
`;
export const getMasterType = /* GraphQL */ `
  query GetMasterType($id: ID!) {
    getMasterType(id: $id) {
      id
      makeup_categories
      color
      country
      base_color
      season
      face_type
      skin_type
      glitter
    }
  }
`;
export const listMasterTypes = /* GraphQL */ `
  query ListMasterTypes(
    $filter: TableMasterTypeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMasterTypes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        makeup_categories
        color
        country
        base_color
        season
        face_type
        skin_type
        glitter
      }
      nextToken
    }
  }
`;
export const getTagType = /* GraphQL */ `
  query GetTagType($tag_name: String!) {
    getTagType(tag_name: $tag_name) {
      tag_name
      count
    }
  }
`;
export const listTagTypes = /* GraphQL */ `
  query ListTagTypes(
    $filter: TableTagTypeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTagTypes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        tag_name
        count
      }
      nextToken
    }
  }
`;
export const getProductType = /* GraphQL */ `
  query GetProductType($product_id: ID!) {
    getProductType(product_id: $product_id) {
      product_id
      product_name
      brand_name
      product_category
      price
      release_date
    }
  }
`;
export const listProductTypes = /* GraphQL */ `
  query ListProductTypes(
    $filter: TableProductTypeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProductTypes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        product_id
        product_name
        brand_name
        product_category
        price
        release_date
      }
      nextToken
    }
  }
`;
