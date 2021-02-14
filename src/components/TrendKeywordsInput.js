import React, {useContext, useEffect, useState} from "react"
import {searchStore, updateTmpConditions, fetchPosts} from "../stores/searchStore"
import {ChipList} from "../components/ChipList"
import {apiRequest} from "../helper/requestHelper"

