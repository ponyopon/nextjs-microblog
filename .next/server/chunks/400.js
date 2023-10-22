"use strict";
exports.id = 400;
exports.ids = [400];
exports.modules = {

/***/ 3858:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ Date)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4146);
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(date_fns__WEBPACK_IMPORTED_MODULE_1__);


function Date({ dateString  }) {
    const date = (0,date_fns__WEBPACK_IMPORTED_MODULE_1__.parseISO)(dateString);
    return(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("time", {
        dateTime: dateString,
        children: (0,date_fns__WEBPACK_IMPORTED_MODULE_1__.format)(date, "LLLL d, yyyy")
    }));
};


/***/ }),

/***/ 8904:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ld": () => (/* binding */ getSortedPostsData),
/* harmony export */   "Le": () => (/* binding */ getAllPostIds),
/* harmony export */   "AU": () => (/* binding */ getPostData)
/* harmony export */ });
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1017);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7147);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var gray_matter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8076);
/* harmony import */ var gray_matter__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(gray_matter__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var remark__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1774);
/* harmony import */ var remark_html__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7740);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([remark__WEBPACK_IMPORTED_MODULE_3__, remark_html__WEBPACK_IMPORTED_MODULE_4__]);
([remark__WEBPACK_IMPORTED_MODULE_3__, remark_html__WEBPACK_IMPORTED_MODULE_4__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);





const postsDirectory = path__WEBPACK_IMPORTED_MODULE_0___default().join(process.cwd(), "posts");
// console.log(postsDirectory);
//mdファイルのデータを日付順に取り出す(トップページのブログ一覧出力で使う)
function getSortedPostsData() {
    // /posts配下のファイル名を取得
    const fileNames = fs__WEBPACK_IMPORTED_MODULE_1___default().readdirSync(postsDirectory);
    // console.log(fileNames);
    const allPostsData = fileNames.map((fileName)=>{
        // idを取得するためにファイル名の拡張子を除外
        const id = fileName.replace(/\.md$/, "");
        //マークダウンファイルを文字列として読み取る
        const fullPath = path__WEBPACK_IMPORTED_MODULE_0___default().join(postsDirectory, fileName);
        const fileContents = fs__WEBPACK_IMPORTED_MODULE_1___default().readFileSync(fullPath, "utf8");
        //投稿のメタデータ部分を解析
        const matterResult = gray_matter__WEBPACK_IMPORTED_MODULE_2___default()(fileContents);
        //idとデータを返す。
        return {
            id,
            ...matterResult.data
        };
    });
    // console.log(allPostsData);
    //投稿を日付でソートする
    return allPostsData.sort((a, b)=>{
        if (a.data < b.data) {
            return 1;
        } else {
            return -1;
        }
    });
}
//動的ルーティング時に設定
//postsディレクトリの中の全てのファイル名をリストで返す
function getAllPostIds() {
    const fileNames = fs__WEBPACK_IMPORTED_MODULE_1___default().readdirSync(postsDirectory);
    // 以下のような配列を返します:
    // [
    //   {
    //     params: {
    //       id: 'ssg-ssr'
    //     }
    //   },
    //   {
    //     params: {
    //       id: 'pre-rendering'
    //     }
    //   }
    // ]
    return fileNames.map((fileName)=>{
        return {
            //あとで、これら(id)がルーティングのパスになる。
            params: {
                id: fileName.replace(/\.md$/, "")
            }
        };
    });
}
//idに基づいてブログの投稿データを返す
async function getPostData(id) {
    const fullPath = path__WEBPACK_IMPORTED_MODULE_0___default().join(postsDirectory, `${id}.md`);
    const fileContents = fs__WEBPACK_IMPORTED_MODULE_1___default().readFileSync(fullPath, "utf8");
    // 投稿のメタデータ部分を解析するために gray-matter を使う
    const matterResult = gray_matter__WEBPACK_IMPORTED_MODULE_2___default()(fileContents);
    // console.log(matterResult);
    // マークダウンをHTML文字列に変換するためにremarkを使う
    const processedContent = await (0,remark__WEBPACK_IMPORTED_MODULE_3__.remark)().use(remark_html__WEBPACK_IMPORTED_MODULE_4__["default"]).process(matterResult.content);
    const contentHTML = processedContent.toString();
    // console.log(contentHTML);
    //データをidと組み合わせる。
    return {
        id,
        contentHTML,
        ...matterResult.data
    };
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;