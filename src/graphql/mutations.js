/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createPostType = /* GraphQL */ `
  mutation CreatePostType($input: CreatePostTypeInput!) {
    createPostType(input: $input) {
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
      gender
    }
  }
`;
export const updatePostType = /* GraphQL */ `
  mutation UpdatePostType($input: UpdatePostTypeInput!) {
    updatePostType(input: $input) {
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
      gender
    }
  }
`;
export const deletePostType = /* GraphQL */ `
  mutation DeletePostType($input: DeletePostTypeInput!) {
    deletePostType(input: $input) {
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
      gender
    }
  }
`;
export const createUserType = /* GraphQL */ `
  mutation CreateUserType($input: CreateUserTypeInput!) {
    createUserType(input: $input) {
      user_id
      name
      nickname
      base_color
      season
      face_type
      skin_type
      gender
    }
  }
`;
export const updateUserType = /* GraphQL */ `
  mutation UpdateUserType($input: UpdateUserTypeInput!) {
    updateUserType(input: $input) {
      user_id
      name
      nickname
      base_color
      season
      face_type
      skin_type
      gender
    }
  }
`;
export const deleteUserType = /* GraphQL */ `
  mutation DeleteUserType {
    deleteUserType {
      user_id
      name
      nickname
      base_color
      season
      face_type
      skin_type
      gender
    }
  }
`;
export const createTagType = /* GraphQL */ `
  mutation CreateTagType($input: CreateTagTypeInput!) {
    createTagType(input: $input) {
      tag_name
      count
    }
  }
`;
export const updateTagType = /* GraphQL */ `
  mutation UpdateTagType($input: UpdateTagTypeInput!) {
    updateTagType(input: $input) {
      tag_name
      count
    }
  }
`;
export const deleteTagType = /* GraphQL */ `
  mutation DeleteTagType($input: DeleteTagTypeInput!) {
    deleteTagType(input: $input) {
      tag_name
      count
    }
  }
`;
export const createProductType = /* GraphQL */ `
  mutation CreateProductType($input: CreateProductTypeInput!) {
    createProductType(input: $input) {
      product_id
      product_name
      brand_name
      product_category
      price
      release_date
    }
  }
`;
export const updateProductType = /* GraphQL */ `
  mutation UpdateProductType($input: UpdateProductTypeInput!) {
    updateProductType(input: $input) {
      product_id
      product_name
      brand_name
      product_category
      price
      release_date
    }
  }
`;
export const deleteProductType = /* GraphQL */ `
  mutation DeleteProductType($input: DeleteProductTypeInput!) {
    deleteProductType(input: $input) {
      product_id
      product_name
      brand_name
      product_category
      price
      release_date
    }
  }
`;
export const createPostLikeType = /* GraphQL */ `
  mutation CreatePostLikeType($input: CreatePostLikeTypeInput!) {
    createPostLikeType(input: $input) {
      post_id
    }
  }
`;
export const createPostViewType = /* GraphQL */ `
  mutation CreatePostViewType($input: CreatePostViewTypeInput!) {
    createPostViewType(input: $input) {
      post_id
    }
  }
`;
export const deletePostLikeType = /* GraphQL */ `
  mutation DeletePostLikeType($input: DeletePostLikeTypeInput!) {
    deletePostLikeType(input: $input) {
      post_id
    }
  }
`;
