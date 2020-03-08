!function(e){function n(l){if(t[l])return t[l].exports;var a=t[l]={i:l,l:!1,exports:{}};return e[l].call(a.exports,a,a.exports,n),a.l=!0,a.exports}var t={};n.m=e,n.c=t,n.d=function(e,t,l){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:l})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},n.p="",n(n.s=0)}([function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});t(1),t(4)},function(e,n,t){"use strict";function l(e){if(Array.isArray(e)){for(var n=0,t=Array(e.length);n<e.length;n++)t[n]=e[n];return t}return Array.from(e)}var a=t(2),o=(t.n(a),t(3)),__=(t.n(o),wp.i18n.__),c=wp.blocks,i=c.registerBlockType,r=c.createBlock,s=wp.blockEditor,m=s.InnerBlocks,u=s.InspectorControls,p=s.MediaUpload,d=wp.components,b=d.TextControl,g=(d.CheckboxControl,d.RadioControl),k=d.SelectControl,f=(d.TextareaControl,d.ToggleControl),y=(d.RangeControl,d.Panel,d.PanelBody),w=d.PanelRow,h=d.ColorPalette,v=d.FocalPointPicker,E=wp.data,I=(E.withDispatch,E.useDispatch,lodash),C=I.times,N=I.dropRight;wp.element.Fragment;i("fp/section-container-block",{title:__("Section container block"),icon:"schedule",category:"fancypantsy",keywords:[__("Section"),__("Container"),__("Wrapper")],description:__("A fully customisable section container block","fancypantsy-section-container-block"),attributes:{backgroundImagePosition:{type:"object",default:{x:.5,y:.5}},backgroundImageUrl:{type:"string",default:null},backgroundImageHeight:{type:"number",default:null},backgroundImageWidth:{type:"number",default:null},backgroundColor:{type:"string",default:null},stickySectionBackground:{type:"boolean"},sectionPadding:{type:"string",default:'{ "top":"0", "right":"0", "bottom":"0", "left":"0" }'},sectionMargin:{type:"string",default:'{ "top":"0", "bottom":"0" }'},backgroundAlignment:{type:"string",default:"none"},columnsAmount:{type:"number",default:"1"},sectionTitle:{type:"string",default:""},sectionTitleHeading:{type:"string",default:"h2"},sectionTitleAlignment:{type:"string",default:"left"},sectionEnableInlinePadding:{type:"boolean",default:!1},sectionEnableInlineMargin:{type:"boolean",default:!1},customAnchor:{type:"string"}},example:{attributes:{sectionTitle:"Title",backgroundColor:"#e3e3e3",columnsAmount:"4",backgroundAlignment:"align-fullwidth",sectionTitleAlignment:"center",sectionEnableInlinePadding:!0,sectionPadding:'{ "top":"20px", "right":"0", "bottom":"80px", "left":"0" }'}},edit:function(e){function n(e,n){i({columnsAmount:parseInt(n)});var t=wp.data.dispatch("core/block-editor"),a=t.replaceInnerBlocks,o=wp.data.select("core/block-editor"),c=o.getBlocks,m=c(s);m=n>e?[].concat(l(m),l(C(n-e,function(){return r("fp/column-block")}))):N(m,e-n),a(s,m,!1)}function t(e,n){var t=JSON.parse(B);t[n]=e>0?e:0;var l=JSON.stringify(t);i({sectionPadding:l})}function a(e,n){var t=JSON.parse(A);t[n]=e>0?e:0;var l=JSON.stringify(t);i({sectionMargin:l})}function o(e){i({backgroundImageUrl:e.sizes.full.url,backgroundImageHeight:e.height,backgroundImageWidth:e.width})}function c(e){i({backgroundImageUrl:null})}var i=(e.className,e.setAttributes),s=(e.setState,e.clientId),d=e.attributes,E=(e.withState,d.backgroundImagePosition),I=d.stickySectionBackground,B=d.sectionPadding,A=d.sectionMargin,S=d.backgroundColor,x=d.columnsAmount,P=d.backgroundImageUrl,O=d.backgroundImageHeight,T=d.backgroundImageWidth,H=d.backgroundAlignment,M=d.sectionTitle,_=d.sectionTitleHeading,j=d.sectionTitleAlignment,U=d.sectionEnableInlinePadding,J=d.sectionEnableInlineMargin,q=d.customAnchor,z=[["fp/column-block",{}]];e.className="wp-block-fp-section-container-block section";var R=void 0;""!==S&&(R={backgroundColor:S});var L=void 0;""!==P&&null!==P&&(L={backgroundImage:"url("+d.backgroundImageUrl+")"});var W=void 0;if(""!==P&&null!==P){W={backgroundPosition:100*E.x+"%"+" "+(100*E.y+"%")}}var D=void 0;""!==P&&null!==P&&1==I&&(D={backgroundAttachment:"fixed"});var F=void 0;H&&"none"!==H&&(F=H);var G=JSON.parse(B),K=JSON.parse(A),Q=void 0,V=void 0,X=wp.data.select("core/editor").getEditorSettings().colors,Y=void 0;return x&&(Y="block-row blocks-in-row-"+x),[wp.element.createElement(u,null,wp.element.createElement(y,{title:__("Anchor","fancypantsy-section-container-block"),initialOpen:!1},wp.element.createElement(w,null,wp.element.createElement("div",{className:"fp-custom-anchor-wrapper"},function(){return!(!q||""===q)&&wp.element.createElement("div",{class:"anchor-example"},wp.element.createElement("p",null,__("Use the strong element as a link for this section","fancypantsy-section-container-block")),wp.element.createElement("strong",null,"#",q))}(),wp.element.createElement(b,{label:__("Anchor","fancypantsy-section-container-block"),placeholder:"#Anchor",value:q,onChange:function(e){return i({customAnchor:e})}})))),wp.element.createElement(y,{title:__("Settings","fancypantsy-section-container-block"),initialOpen:!0},wp.element.createElement(w,null,wp.element.createElement(b,{label:__("Section title","fancypantsy-section-container-block"),placeholder:__("Enter your section title here","fancypantsy-section-container-block"),value:M,onChange:function(e){return i({sectionTitle:e})}})),wp.element.createElement(w,null,wp.element.createElement(g,{label:__("Section title heading","fancypantsy-section-container-block"),value:_,selected:_,className:"title-heading-panel",options:[{value:"h1",label:__("H1","fancypantsy-section-container-block")},{value:"h2",label:__("H2","fancypantsy-section-container-block")},{value:"h3",label:__("H3","fancypantsy-section-container-block")},{value:"h4",label:__("H4","fancypantsy-section-container-block")},{value:"h5",label:__("H5","fancypantsy-section-container-block")},{value:"h6",label:__("H6","fancypantsy-section-container-block")}],onChange:function(e){return i({sectionTitleHeading:e})}})),function(){return""!==M&&[wp.element.createElement(w,null,wp.element.createElement(g,{label:__("Section title alignment","fancypantsy-section-container-block"),value:j,selected:j,options:[{value:"left",label:__("Align Left","fancypantsy-section-container-block")},{value:"center",label:__("Align center","fancypantsy-section-container-block")},{value:"right",label:__("Align right","fancypantsy-section-container-block")}],onChange:function(e){return i({sectionTitleAlignment:e})}}))]}(),wp.element.createElement(w,null,wp.element.createElement(k,{label:__("Amount of blocks","fancypantsy-section-container-block"),value:x,options:[{value:"1",label:__("1","fancypantsy-section-container-block")},{value:"2",label:__("2","fancypantsy-section-container-block")},{value:"3",label:__("3","fancypantsy-section-container-block")},{value:"4",label:__("4","fancypantsy-section-container-block")}],onChange:function(e){return n(x,e)}}))),wp.element.createElement(y,{title:__("Background","fancypantsy-section-container-block"),initialOpen:!1},wp.element.createElement(w,null,wp.element.createElement("div",{className:"components-base-control"},wp.element.createElement("label",{class:"components-base-control__label"},__("Image","fancypantsy-section-container-block")),wp.element.createElement(p,{onSelect:o,render:function(e){var n=e.open;return wp.element.createElement("img",{className:"components-img",src:P,onClick:n})}}),wp.element.createElement("div",{class:"section-media-upload"},wp.element.createElement(p,{onSelect:o,render:function(e){var n=e.open;return wp.element.createElement("button",{type:"button",className:"components-button is-primary is-default",src:P,onClick:n},__("Add image","fancypantsy-section-container-block"))}}),function(){return null==P?"":wp.element.createElement("span",{class:"remove-section-img",onClick:c}," ",__("Remove","fancypantsy-section-container-block")," ")}()))),function(){return null==P?"":[wp.element.createElement(w,null,wp.element.createElement(f,{label:__("Sticky background","fancypantsy-section-container-block"),checked:I,onChange:function(e){i({stickySectionBackground:e})}})),wp.element.createElement(w,null,wp.element.createElement(v,{label:__("Focal Point Picker"),url:P,dimensions:{width:T,height:O},value:E,onChange:function(e){return i({backgroundImagePosition:e})}}))]}(),wp.element.createElement(w,null,wp.element.createElement("div",null,wp.element.createElement("label",{class:"components-base-control__label"},__("Background color","fancypantsy-section-container-block")),wp.element.createElement(h,{colors:X,value:"transparent",disableCustomColors:"false",onChange:function(e){return i({backgroundColor:e})}}))),function(){if(null!==P||null!==S)return[wp.element.createElement(w,null,wp.element.createElement(k,{label:__("Background alignment","fancypantsy-section-container-block"),value:H,options:[{value:"none",label:__("Align center","fancypantsy-section-container-block")},{value:"align-left",label:__("Align left","fancypantsy-section-container-block")},{value:"align-right",label:__("Align right","fancypantsy-section-container-block")},{value:"align-fullwidth",label:__("Fullwidth","fancypantsy-section-container-block")}],onChange:function(e){return i({backgroundAlignment:e})}}))]}()),wp.element.createElement(y,{title:__("Whitespace","fancypantsy-section-container-block"),initialOpen:!1},wp.element.createElement(w,null,wp.element.createElement(f,{label:__("Inline padding","fancypantsy-section-container-block"),checked:U,onChange:function(e){i({sectionEnableInlinePadding:e})}})),function(){return!(!U||!0!==U)&&(0!==G&&(Q={padding:+parseInt(G.top)+"px "+parseInt(G.right)+"px "+parseInt(G.bottom)+"px "+parseInt(G.left)+"px"}),[wp.element.createElement("div",null,wp.element.createElement("div",{class:"padding-wrapper"},wp.element.createElement("div",{class:"custom-label"},"Padding ",wp.element.createElement("small",null,"(in px)")),wp.element.createElement(b,{type:"number",label:"Top",className:"quarter-size",value:G.top,onChange:function(e){return t(e,"top")}}),wp.element.createElement(b,{type:"number",label:"Right",className:"quarter-size",value:G.right,onChange:function(e){return t(e,"right")}}),wp.element.createElement(b,{type:"number",label:"Bottom",className:"quarter-size",value:G.bottom,onChange:function(e){return t(e,"bottom")}}),wp.element.createElement(b,{type:"number",label:"Left",className:"quarter-size",value:G.left,onChange:function(e){return t(e,"left")}})))])}(),wp.element.createElement(w,null,wp.element.createElement(f,{label:__("Inline margin","fancypantsy-section-container-block"),checked:J,onChange:function(e){i({sectionEnableInlineMargin:e})}})),function(){return!(!J||!0!==J)&&(0!==K&&(V={marginTop:+parseInt(K.top)+"px",marginBottom:+parseInt(K.bottom)+"px"}),[wp.element.createElement("div",null,wp.element.createElement("div",{class:"margin-wrapper"},wp.element.createElement("div",{class:"custom-label"},"Margin ",wp.element.createElement("small",null,"(in px)")),wp.element.createElement(b,{type:"number",label:"Top",className:"quarter-size",value:K.top,onChange:function(e){return a(e,"top")}}),wp.element.createElement(b,{type:"number",label:"Bottom",className:"quarter-size",value:K.bottom,onChange:function(e){return a(e,"bottom")}})))])}())),wp.element.createElement("div",{"data-section-bg-alignment":F,className:e.className,style:Object.assign({},V)},function(){return!(!q||""===q)&&wp.element.createElement("div",{id:q,className:"section-anchor"})}(),wp.element.createElement("div",{className:"container",style:Object.assign({},Q)},wp.element.createElement("div",{className:"background-element",style:Object.assign({},W,L,R,D)}),function(){var e=void 0;return e="section-title",j&&""!==M&&(e+=" text-align-"+j),""!==M&&"h1"==_?[wp.element.createElement("h1",{className:e},M)]:""!==M&&"h2"==_?[wp.element.createElement("h2",{className:e},M)]:""!==M&&"h3"==_?[wp.element.createElement("h3",{className:e},M)]:""!==M&&"h4"==_?[wp.element.createElement("h4",{className:e},M)]:""!==M&&"h5"==_?[wp.element.createElement("h5",{className:e},M)]:""!==M&&"h6"==_&&[wp.element.createElement("h6",{className:e},M)]}(),wp.element.createElement("div",{className:Y},wp.element.createElement(m,{template:z,templateLock:"insert",allowedBlocks:["fp/column-block"]}))))]},save:function(e){var n=(e.className,e.setAttributes,e.setState,e.attributes),t=(e.withState,n.backgroundImagePosition),l=n.stickySectionBackground,a=n.sectionPadding,o=n.sectionMargin,c=n.backgroundColor,i=n.columnsAmount,r=n.backgroundImageUrl,s=n.backgroundAlignment,u=n.sectionTitle,p=n.sectionTitleHeading,d=n.sectionTitleAlignment,b=n.sectionEnableInlinePadding,g=n.sectionEnableInlineMargin,k=n.customAnchor;e.className="wp-block-fp-section-container-block section";var f=void 0;""!==c&&(f={backgroundColor:c});var y=void 0;""!==r&&null!==r&&(y={backgroundImage:"url("+n.backgroundImageUrl+")"});var w=void 0;if(""!==r&&null!==r&&""!==r&&null!==r){w={backgroundPosition:100*t.x+"%"+" "+(100*t.y+"%")}}var h=void 0;""!==r&&null!==r&&1==l&&(h={backgroundAttachment:"fixed"});var v=void 0;s&&"none"!==s&&(v=s);var E=JSON.parse(a),I=JSON.parse(o),C=void 0,N=void 0;b&&!0===b&&0!==E&&(C={padding:+parseInt(E.top)+"px "+parseInt(E.right)+"px "+parseInt(E.bottom)+"px "+parseInt(E.left)+"px"}),g&&!0===g&&0!==I&&(N={marginTop:+parseInt(I.top)+"px",marginBottom:+parseInt(I.bottom)+"px"});var B=(wp.data.select("core/editor").getEditorSettings().colors,void 0);return i&&(B="block-row blocks-in-row-"+i),wp.element.createElement("section",{"data-section-bg-alignment":v,className:e.className,style:Object.assign({},N)},function(){return!(!k||""===k)&&wp.element.createElement("div",{id:k,className:"section-anchor"})}(),wp.element.createElement("div",{className:"container",style:Object.assign({},C)},wp.element.createElement("div",{className:"background-element",style:Object.assign({},w,y,f,h)}),function(){var e=void 0;return e="section-title",d&&""!==u&&(e+=" text-align-"+d),""!==u&&"h1"==p?[wp.element.createElement("h1",{className:e},u)]:""!==u&&"h2"==p?[wp.element.createElement("h2",{className:e},u)]:""!==u&&"h3"==p?[wp.element.createElement("h3",{className:e},u)]:""!==u&&"h4"==p?[wp.element.createElement("h4",{className:e},u)]:""!==u&&"h5"==p?[wp.element.createElement("h5",{className:e},u)]:""!==u&&"h6"==p&&[wp.element.createElement("h6",{className:e},u)]}(),wp.element.createElement("div",{className:B},wp.element.createElement(m.Content,null))))}})},function(e,n){},function(e,n){},function(e,n,t){"use strict";function l(){return fpscbglobal.allowedColumnBlocks[0]}var a=t(5),o=(t.n(a),t(6)),__=(t.n(o),wp.i18n.__),c=wp.blocks.registerBlockType,i=wp.blockEditor,r=i.InnerBlocks,s=(i.InspectorControls,i.MediaUpload,wp.components),m=s.Button,u=s.Modal,p=wp.compose.withState,d=p({isOpen:!1})(function(e){var n=e.isOpen,t=e.setState,a=e.setEdit,o=e.setPreview,c=e.setInnerBlocksCount;return wp.element.createElement("div",null,0==n&&wp.element.createElement(r,{allowedBlocks:l(),templateLock:!1}),1==c&&wp.element.createElement(m,{isDefault:!0,onClick:function(){return t({isOpen:!0},a)}},__("Edit in modal","fancypantsy-section-container-block")),n&&wp.element.createElement(u,{title:__("Edit block","fancypantsy-section-container-block"),className:"custom-innerblock-modal",onRequestClose:function(){return t({isOpen:!1},o)},shouldCloseOnClickOutside:!1},wp.element.createElement(r,{allowedBlocks:l(),templateLock:!1}),wp.element.createElement("div",{className:"hide-modal-btn-wrapper"},wp.element.createElement(m,{className:"components-button is-button is-primary",isDefault:!0,onClick:function(){return t({isOpen:!1},o)}},__("Hide modal","fancypantsy-section-container-block")))))});c("fp/column-block",{title:__("Column block"),icon:"grid-view",category:"fancypantsy",parent:["fp/section-container-block"],description:__("A inner block, used for the layout for your section container block","fancypantsy-section-container-block"),inserter:!1,keywords:[__("Column block","fancypantsy-section-container-block"),__("Column","fancypantsy-section-container-block")],edit:function(e){var n=(e.className,e.setAttributes,e.setState,e.clientId),t=(e.attributes,e.withState,function(e){if(null!=wp.data.select("core/block-editor").getBlocksByClientId(n)[0].innerBlocks){var t=wp.data.select("core/block-editor").getBlocksByClientId(n)[0].innerBlocks[0];wp.data.dispatch("core/block-editor").updateBlockAttributes(t.clientId,{mode:"edit"})}}),l=function(e){if(null!=wp.data.select("core/block-editor").getBlocksByClientId(n)[0].innerBlocks){var t=wp.data.select("core/block-editor").getBlocksByClientId(n)[0].innerBlocks[0];wp.data.dispatch("core/block-editor").updateBlockAttributes(t.clientId,{mode:"preview"})}};return e.className="wp-block-fp-column-block column",[wp.element.createElement("div",{className:e.className},wp.element.createElement(d,{setEdit:t,setPreview:l,setInnerBlocksCount:function(){if(null!=wp.data.select("core/block-editor").getBlocksByClientId(n)[0]){return 0!==wp.data.select("core/block-editor").getBlocksByClientId(n)[0].innerBlocks.length}}()}))]},save:function(e){e.className,e.setAttributes,e.setState,e.clientId,e.attributes,e.withState;return e.className="wp-block-fp-column-block column",wp.element.createElement("div",{className:e.className},wp.element.createElement(r.Content,null))}})},function(e,n){},function(e,n){}]);