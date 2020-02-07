(function(t){function e(e){for(var a,c,o=e[0],i=e[1],l=e[2],d=0,p=[];d<o.length;d++)c=o[d],Object.prototype.hasOwnProperty.call(n,c)&&n[c]&&p.push(n[c][0]),n[c]=0;for(a in i)Object.prototype.hasOwnProperty.call(i,a)&&(t[a]=i[a]);u&&u(e);while(p.length)p.shift()();return r.push.apply(r,l||[]),s()}function s(){for(var t,e=0;e<r.length;e++){for(var s=r[e],a=!0,o=1;o<s.length;o++){var i=s[o];0!==n[i]&&(a=!1)}a&&(r.splice(e--,1),t=c(c.s=s[0]))}return t}var a={},n={app:0},r=[];function c(e){if(a[e])return a[e].exports;var s=a[e]={i:e,l:!1,exports:{}};return t[e].call(s.exports,s,s.exports,c),s.l=!0,s.exports}c.m=t,c.c=a,c.d=function(t,e,s){c.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:s})},c.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},c.t=function(t,e){if(1&e&&(t=c(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(c.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)c.d(s,a,function(e){return t[e]}.bind(null,a));return s},c.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return c.d(e,"a",e),e},c.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},c.p="/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],i=o.push.bind(o);o.push=e,o=o.slice();for(var l=0;l<o.length;l++)e(o[l]);var u=i;r.push([0,"chunk-vendors"]),s()})({0:function(t,e,s){t.exports=s("56d7")},"56d7":function(t,e,s){"use strict";s.r(e);s("e260"),s("e6cf"),s("cca6"),s("a79d");var a=s("2b0e"),n=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("v-app",{staticClass:"grey lighten=4"},[s("Navbar"),s("v-content",{staticClass:"ma-4"},[s("router-view")],1)],1)},r=[],c=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("nav",[s("v-snackbar",{attrs:{top:"",color:"success",timeout:5e3},model:{value:t.snackbar,callback:function(e){t.snackbar=e},expression:"snackbar"}},[s("span",[t._v("Project added")]),s("v-btn",{attrs:{text:"",color:"white"},on:{click:function(e){t.snackbar=!1}}},[t._v("Close")])],1),s("v-toolbar",{attrs:{flat:""}},[s("v-app-bar-nav-icon",{staticClass:"grey--text",on:{click:function(e){t.drawer=!t.drawer}}}),s("v-toolbar-title",{staticClass:"text-uppercase grey--text"},[s("span",{staticClass:"font-weight-light"},[t._v("Asset Maintenance")]),s("span",[t._v("Tracker")])]),s("v-spacer"),s("v-menu",{attrs:{"offset-y":""},scopedSlots:t._u([{key:"activator",fn:function(e){var a=e.on;return[s("v-btn",t._g({staticClass:"mr-3",attrs:{color:"primary",dark:""}},a),[s("v-icon",{attrs:{left:""}},[t._v("expand_more")]),s("span",[t._v("Menu")])],1)]}}])},[s("v-list",t._l(t.links,(function(e){return s("v-list-item",{key:e.text,attrs:{router:"",to:e.route}},[s("v-list-item-title",[t._v(t._s(e.text))])],1)})),1)],1),s("v-btn",{attrs:{depressed:"",color:"primary"}},[s("span",[t._v("Sign Out")]),s("v-icon",{attrs:{right:""}},[t._v("exit_to_app")])],1)],1),s("v-navigation-drawer",{staticClass:"primary",attrs:{app:""},model:{value:t.drawer,callback:function(e){t.drawer=e},expression:"drawer"}},[s("v-app-bar-nav-icon",{staticClass:"grey--text mt-2 ml-2",on:{click:function(e){t.drawer=!t.drawer}}}),s("v-layout",{attrs:{column:"","align-center":""}},[s("v-flex",{staticClass:"mt-4 mt-3"},[s("NewAsset",{on:{newAssetAdded:function(e){t.snackbar=!0}}})],1)],1),s("v-list",{staticClass:"primary d-flex flex-column"},t._l(t.links,(function(e){return s("v-list-item",{key:e.text,staticClass:"ma-3"},[s("router-link",{staticClass:"d-flex flex-row",attrs:{to:e.route}},[s("v-list-item-action",[s("v-icon",{staticClass:"white--text"},[t._v(t._s(e.icon))])],1),s("v-list-item-content",[s("v-list-item-title",{staticClass:"white--text ma-5"},[t._v(t._s(e.text))])],1)],1)],1)})),1)],1)],1)},o=[],i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("v-dialog",{attrs:{"max-width":"600px"},scopedSlots:t._u([{key:"activator",fn:function(e){var a=e.on;return[s("v-btn",t._g({staticClass:"success",attrs:{text:""}},a),[t._v("Add new asset")])]}}]),model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[s("v-card",[s("v-card-title",[s("h2",[t._v("Add a New Asset")])]),s("v-card-text",[s("v-form",{ref:"newAssetForm",staticClass:"px-3"},[s("v-text-field",{attrs:{label:"Asset Id","prepend-icon":"folder",rules:t.inputRules},model:{value:t.asset.assetId,callback:function(e){t.$set(t.asset,"assetId",e)},expression:"asset.assetId"}}),s("v-text-field",{attrs:{label:"Serial Number","prepend-icon":"folder",rules:t.inputRules},model:{value:t.asset.serialNumber,callback:function(e){t.$set(t.asset,"serialNumber",e)},expression:"asset.serialNumber"}}),s("v-menu",{attrs:{"max-width":"290px"},scopedSlots:t._u([{key:"activator",fn:function(e){var a=e.on;return[s("v-text-field",t._g({attrs:{value:t.formattedInstallDate,rules:t.inputRules,label:"Installation date","prepend-icon":"date_range"}},a))]}}])},[s("v-date-picker",{model:{value:t.asset.dateOfInstall,callback:function(e){t.$set(t.asset,"dateOfInstall",e)},expression:"asset.dateOfInstall"}})],1),s("v-text-field",{attrs:{label:"Address","prepend-icon":"house",rules:t.inputRules},model:{value:t.asset.address,callback:function(e){t.$set(t.asset,"address",e)},expression:"asset.address"}}),s("v-textarea",{attrs:{label:"Description","prepend-icon":"edit",rules:t.inputRules},model:{value:t.asset.description,callback:function(e){t.$set(t.asset,"description",e)},expression:"asset.description"}}),s("v-select",{attrs:{items:t.schedule,"menu-props":"auto",label:"Maintenance Schedule","hide-details":"","prepend-icon":"alarm","single-line":""},model:{value:t.asset.maintenanceSchedule,callback:function(e){t.$set(t.asset,"maintenanceSchedule",e)},expression:"asset.maintenanceSchedule"}}),s("v-menu",{attrs:{"max-width":"290px"},scopedSlots:t._u([{key:"activator",fn:function(e){var a=e.on;return[s("v-text-field",t._g({attrs:{value:t.formattedScheduledDate,rules:t.inputRules,label:"Scheduled maintenance date","prepend-icon":"date_range"}},a))]}}])},[s("v-date-picker",{model:{value:t.asset.nextScheduledDate,callback:function(e){t.$set(t.asset,"nextScheduledDate",e)},expression:"asset.nextScheduledDate"}})],1),s("v-spacer"),s("v-btn",{staticClass:"success mx-0 mt-3",attrs:{text:"",loading:t.loading},on:{click:t.submitNewProject}},[t._v("Add Asset")])],1)],1)],1)],1)},l=[],u=(s("a4d3"),s("e01a"),s("4de4"),s("4160"),s("e439"),s("dbb4"),s("b64b"),s("159b"),s("96cf"),s("1da1")),d=s("ade3"),p=s("b166"),v=s("e3ee"),f=s("2f62");function m(t,e){var s=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),s.push.apply(s,a)}return s}function b(t){for(var e=1;e<arguments.length;e++){var s=null!=arguments[e]?arguments[e]:{};e%2?m(Object(s),!0).forEach((function(e){Object(d["a"])(t,e,s[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(s)):m(Object(s)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(s,e))}))}return t}var h={data:function(){return{dialog:!1,asset:{assetId:"",serialNumber:"",dateOfInstall:null,address:"",description:"",maintenanceSchedule:"",nextScheduledDate:null},inputRules:[function(t){return t.length>=3||"Minimum length is 3 characters."}],loading:!1,schedule:["semi-annual","annual"]}},methods:b({},Object(f["b"])(["addAsset"]),{submitNewProject:function(){var t=Object(u["a"])(regeneratorRuntime.mark((function t(){var e,s=this;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!this.$refs.newAssetForm.validate()){t.next=5;break}return this.loading=!0,e={assetId:this.asset.assetId,serialNumber:this.asset.serialNumber,dateOfInstall:Object(p["a"])(Object(v["a"])(this.asset.dateOfInstall),"yyyy/MM/dd"),address:this.asset.address,description:this.asset.description,maintenanceSchedule:this.asset.maintenanceSchedule,nextScheduledDate:Object(p["a"])(Object(v["a"])(this.asset.nextScheduledDate),"yyyy/MM/dd")},t.next=5,this.addAsset(e).then((function(){s.loading=!1,s.dialog=!1}));case 5:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}()}),computed:{formattedInstallDate:function(){return this.asset.dateOfInstall?Object(p["a"])(Object(v["a"])(this.asset.dateOfInstall),"yyyy/MM/dd"):""},formattedScheduledDate:function(){return this.asset.nextScheduledDate?Object(p["a"])(Object(v["a"])(this.asset.nextScheduledDate),"yyyy/MM/dd"):""}}},y=h,x=s("2877"),_=s("6544"),g=s.n(_),O=s("8336"),w=s("b0af"),j=s("99d9"),k=s("2e4b"),C=s("169a"),A=s("4bd4"),S=s("e449"),V=s("b974"),D=s("2fa4"),P=s("8654"),I=s("a844"),M=Object(x["a"])(y,i,l,!1,null,"86256384",null),N=M.exports;g()(M,{VBtn:O["a"],VCard:w["a"],VCardText:j["a"],VCardTitle:j["b"],VDatePicker:k["a"],VDialog:C["a"],VForm:A["a"],VMenu:S["a"],VSelect:V["a"],VSpacer:D["a"],VTextField:P["a"],VTextarea:I["a"]});var R={components:{NewAsset:N},data:function(){return{drawer:!1,links:[{icon:"dashboard",text:"Asset List",route:"/"},{icon:"assessment",text:"Metrics",route:"/metrics"}],snackbar:!1}}},T=R,$=s("5bc1"),E=s("0e8f"),B=s("132d"),L=s("a722"),F=s("8860"),z=s("da13"),J=s("1800"),q=s("5d23"),G=s("f774"),H=s("2db4"),K=s("71d9"),Q=s("2a7f"),U=Object(x["a"])(T,c,o,!1,null,"50785db9",null),W=U.exports;g()(U,{VAppBarNavIcon:$["a"],VBtn:O["a"],VFlex:E["a"],VIcon:B["a"],VLayout:L["a"],VList:F["a"],VListItem:z["a"],VListItemAction:J["a"],VListItemContent:q["a"],VListItemTitle:q["b"],VMenu:S["a"],VNavigationDrawer:G["a"],VSnackbar:H["a"],VSpacer:D["a"],VToolbar:K["a"],VToolbarTitle:Q["a"]});var X={name:"app",components:{Navbar:W}},Y=X,Z=s("7496"),tt=s("a75b"),et=Object(x["a"])(Y,n,r,!1,null,null,null),st=et.exports;g()(et,{VApp:Z["a"],VContent:tt["a"]});var at=s("8c4f"),nt=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"assets"},[s("h1",{staticClass:"subheading grey--text"},[t._v("Assets")]),s("v-container",{staticClass:"ma-4"},[s("v-layout",{staticClass:"mb-3",attrs:{row:""}},[s("v-tooltip",{attrs:{top:""},scopedSlots:t._u([{key:"activator",fn:function(e){var a=e.on;return[s("v-btn",t._g({staticClass:"ma-2",attrs:{small:"",color:"light-blue"},on:{click:function(e){return t.sortBy("assetId")}}},a),[s("v-icon",{attrs:{left:"",small:""}},[t._v("folder")]),s("span",{staticClass:"caption text-capitalize"},[t._v("By Asset ID")])],1)]}}])},[s("span",[t._v("Sort assets by asset id")])]),s("v-tooltip",{attrs:{top:""},scopedSlots:t._u([{key:"activator",fn:function(e){var a=e.on;return[s("v-btn",t._g({staticClass:"ma-2",attrs:{small:"",color:"light-blue"},on:{click:function(e){return t.sortBy("nextScheduledDate")}}},a),[s("v-icon",{attrs:{left:"",small:""}},[t._v("alarm")]),s("span",{staticClass:"caption text-capitalize"},[t._v("By Due Date")])],1)]}}])},[s("span",[t._v("Sort assets by due date")])])],1),t.error?s("p",{staticClass:"error"},[t._v(t._s(t.error))]):t._e(),t._l(t.allAssets,(function(t){return s("v-card",{key:t.assetId,attrs:{depressed:""}},[s("Asset",{attrs:{asset:t}}),s("v-divider")],1)}))],2)],1)},rt=[],ct=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("v-layout",{staticClass:"`pa-2 ml-1 asset`",attrs:{row:"",wrap:""}},[s("v-flex",{attrs:{xs11:"",sm11:"",md11:""}},[s("v-layout",{staticClass:"pa-2 ml-1",attrs:{row:"",wrap:""}},[s("v-flex",{attrs:{xs6:"",sm3:"",md2:""}},[s("div",{staticClass:"caption grey--text"},[t._v("Asset ID")]),s("div",[t._v(t._s(t.asset.assetId))])]),s("v-flex",{attrs:{xs6:"",sm3:"",md2:""}},[s("div",{staticClass:"caption grey--text"},[t._v("Serial Number")]),s("div",[t._v(t._s(t.asset.serialNumber))])]),s("v-flex",{attrs:{xs6:"",sm3:"",md2:""}},[s("div",{staticClass:"caption grey--text"},[t._v("Date of Install")]),s("div",[t._v(t._s(t.asset.dateOfInstall))])]),s("v-flex",{attrs:{xs6:"",sm3:"",m2:""}},[s("div",{staticClass:"caption grey--text"},[t._v("Address")]),s("div",[t._v(t._s(t.asset.address))])]),s("v-flex",{attrs:{xs6:"",sm4:"",md3:""}},[s("div",{staticClass:"caption grey--text"},[t._v("Description")]),s("div",[t._v(t._s(t.asset.description))])]),s("v-flex",{attrs:{xs6:"",sm6:"",m6:""}},[s("v-layout",{staticClass:"pa-2",attrs:{row:"",wrap:""}},[s("v-flex",{attrs:{xs4:"",sm4:"",m4:""}},[t.asset.contacts.length>0?s("div",{staticClass:"caption grey--text"},[t._v("Contact Name")]):t._e(),t.asset.contacts.length>0?s("div",[t._v(t._s(t.asset.contacts[0].name))]):t._e()]),s("v-flex",{attrs:{xs4:"",sm4:"",m4:""}},[t.asset.contacts.length>0?s("div",{staticClass:"caption grey--text"},[t._v("Contact Phone")]):t._e(),t.asset.contacts.length>0?s("div",[t._v(t._s(t.asset.contacts[0].phone))]):t._e()]),s("v-flex",{attrs:{xs4:"",sm4:"",m4:""}},[t.asset.contacts.length>0?s("div",{staticClass:"caption grey--text"},[t._v("Contact Email")]):t._e(),t.asset.contacts.length>0?s("div",[t._v(t._s(t.asset.contacts[0].email))]):t._e()])],1)],1),s("v-flex",{attrs:{xs6:"",sm4:"",md2:""}},[s("div",{staticClass:"caption grey--text"},[t._v("Maintenance Schedule")]),s("div",[t._v(t._s(t.asset.maintenanceSchedule))])]),s("v-flex",{attrs:{xs6:"",sm2:"",md2:""}},[s("div",{staticClass:"caption grey--text"},[t._v("Due By")]),s("div",[t._v(t._s(t.asset.nextScheduledDate))])])],1)],1),s("v-flex",{staticClass:"pa-2 my-auto",attrs:{column:"",xs1:"",sm1:"",md1:""}},[s("div",{staticClass:"buttons",on:{click:function(e){return t.addContact(t.asset._id)}}},[s("v-tooltip",{attrs:{top:""},scopedSlots:t._u([{key:"activator",fn:function(e){var a=e.on;return[s("v-icon",t._g({attrs:{color:"grey"}},a),[t._v("person_add")])]}}])},[s("span",[t._v("Add contact")])])],1),s("div",{staticClass:"buttons",on:{click:function(e){return t.addMaintenance(t.asset._id)}}},[s("v-tooltip",{attrs:{top:""},scopedSlots:t._u([{key:"activator",fn:function(e){var a=e.on;return[s("v-icon",t._g({attrs:{color:"grey"}},a),[t._v("build")])]}}])},[s("span",[t._v("Log maintenance")])])],1),s("div",{staticClass:"buttons",on:{click:function(e){return t.updateAsset(t.asset._id)}}},[s("v-tooltip",{attrs:{top:""},scopedSlots:t._u([{key:"activator",fn:function(e){var a=e.on;return[s("v-icon",t._g({attrs:{color:"grey"}},a),[t._v("create")])]}}])},[s("span",[t._v("Edit asset")])])],1),s("div",{staticClass:"buttons",on:{click:function(e){return t.removeAsset(t.asset._id)}}},[s("v-tooltip",{attrs:{top:""},scopedSlots:t._u([{key:"activator",fn:function(e){var a=e.on;return[s("v-icon",t._g({attrs:{color:"red"}},a),[t._v("delete")])]}}])},[s("span",[t._v("Delete asset")])])],1)])],1)},ot=[];function it(t,e){var s=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),s.push.apply(s,a)}return s}function lt(t){for(var e=1;e<arguments.length;e++){var s=null!=arguments[e]?arguments[e]:{};e%2?it(Object(s),!0).forEach((function(e){Object(d["a"])(t,e,s[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(s)):it(Object(s)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(s,e))}))}return t}var ut={name:"Asset",props:["asset"],data:function(){return{}},methods:lt({},Object(f["b"])(["removeAsset"]))},dt=ut,pt=s("3a2f"),vt=Object(x["a"])(dt,ct,ot,!1,null,"25814114",null),ft=vt.exports;function mt(t,e){var s=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),s.push.apply(s,a)}return s}function bt(t){for(var e=1;e<arguments.length;e++){var s=null!=arguments[e]?arguments[e]:{};e%2?mt(Object(s),!0).forEach((function(e){Object(d["a"])(t,e,s[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(s)):mt(Object(s)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(s,e))}))}return t}g()(vt,{VFlex:E["a"],VIcon:B["a"],VLayout:L["a"],VTooltip:pt["a"]});var ht={name:"Assets",components:{Asset:ft},computed:bt({},Object(f["c"])(["allAssets"]),{assets:function(){return this.fetchAssets()}}),data:function(){return{error:""}},methods:bt({},Object(f["b"])(["fetchAssets"]),{sortBy:function(t){this.assets.sort((function(e,s){return e[t]<s[t]?-1:1}))}})},yt=ht,xt=s("a523"),_t=s("ce7e"),gt=Object(x["a"])(yt,nt,rt,!1,null,"7417fea7",null),Ot=gt.exports;g()(gt,{VBtn:O["a"],VCard:w["a"],VContainer:xt["a"],VDivider:_t["a"],VIcon:B["a"],VLayout:L["a"],VTooltip:pt["a"]});var wt=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("p",[t._v("This part of the site is under development. Please come back later.")])},jt=[],kt={name:"Metrics"},Ct=kt,At=Object(x["a"])(Ct,wt,jt,!1,null,"4d748814",null),St=At.exports;a["a"].use(at["a"]);var Vt=[{path:"/",name:"assets",component:Ot},{path:"/metrics",name:"metrics",component:St}],Dt=new at["a"]({mode:"history",base:"/",routes:Vt}),Pt=Dt,It=s("bc3a"),Mt=s.n(It),Nt=s("f309");s("d1e78");a["a"].use(Nt["a"]);var Rt=new Nt["a"]({icons:{iconfont:"md"}}),Tt=(s("d3b7"),s("d4ec")),$t=s("bee2"),Et="api/assets/",Bt=function(){function t(){Object(Tt["a"])(this,t)}return Object($t["a"])(t,null,[{key:"getAssets",value:function(){return new Promise(function(){var t=Object(u["a"])(regeneratorRuntime.mark((function t(e,s){var a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,Mt.a.get(Et);case 3:a=t.sent,e(a.data),t.next=10;break;case 7:t.prev=7,t.t0=t["catch"](0),s(t.t0);case 10:case"end":return t.stop()}}),t,null,[[0,7]])})));return function(e,s){return t.apply(this,arguments)}}())}},{key:"createAsset",value:function(t){return Mt.a.post(Et,t)}},{key:"deleteAsset",value:function(t){return Mt.a.delete("".concat(Et).concat(t))}},{key:"updateAsset",value:function(t,e){return Mt.a.put("".concat(Et).concat(t),e)}},{key:"modifyAsset",value:function(t){return Mt.a.put("".concat(Et).concat(t,"/complete"))}}]),t}(),Lt=Bt,Ft={assets:[]},zt={allAssets:function(t){return t.assets}},Jt={fetchAssets:function(){var t=Object(u["a"])(regeneratorRuntime.mark((function t(e){var s,a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return s=e.commit,t.next=3,Lt.getAssets();case 3:a=t.sent,s("setAssets",a);case 5:case"end":return t.stop()}}),t)})));function e(e){return t.apply(this,arguments)}return e}(),addAsset:function(){var t=Object(u["a"])(regeneratorRuntime.mark((function t(e,s){var a,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return a=e.commit,t.next=3,Mt.a.post("http://localhost:5000/api/assets/",s);case 3:n=t.sent,a("newAsset",n);case 5:case"end":return t.stop()}}),t)})));function e(e,s){return t.apply(this,arguments)}return e}(),removeAsset:function(){var t=Object(u["a"])(regeneratorRuntime.mark((function t(e,s){var a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return a=e.commit,t.next=3,Lt.deleteAsset(s);case 3:a("removeAsset",s);case 4:case"end":return t.stop()}}),t)})));function e(e,s){return t.apply(this,arguments)}return e}()},qt={setAssets:function(t,e){return t.assets=e},newAsset:function(t,e){return t.assets.push(e)},removeAsset:function(t,e){return t.assets=t.assets.filter((function(t){return t._id!==e}))}},Gt={state:Ft,getters:zt,actions:Jt,mutations:qt};a["a"].use(f["a"]);var Ht=new f["a"].Store({modules:{assets:Gt}});a["a"].config.productionTip=!1,new a["a"]({store:Ht,router:Pt,vuetify:Rt,axios:Mt.a,render:function(t){return t(st)}}).$mount("#app")}});
//# sourceMappingURL=app.2710ebbc.js.map