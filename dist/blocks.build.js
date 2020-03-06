!function(e){function n(l){if(t[l])return t[l].exports;var a=t[l]={i:l,l:!1,exports:{}};return e[l].call(a.exports,a,a.exports,n),a.l=!0,a.exports}var t={};n.m=e,n.c=t,n.d=function(e,t,l){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:l})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},n.p="",n(n.s=0)}([function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});t(1),t(4)},function(e,n,t){"use strict";var l=t(2),a=(t.n(l),t(3)),__=(t.n(a),wp.i18n.__),o=wp.blocks.registerBlockType,c=wp.blockEditor,i=c.InnerBlocks,r=c.InspectorControls,s=c.MediaUpload,m=wp.components,p=m.TextControl,u=(m.CheckboxControl,m.RadioControl),b=m.SelectControl,d=(m.TextareaControl,m.ToggleControl),g=(m.RangeControl,m.Panel,m.PanelBody),f=m.PanelRow,k=m.ColorPalette,y=(wp.element.Fragment,lodash),w=y.times;console.log(wp.i18n.__("Settings","fancypantsy-section-container-block")),o("fp/section-container-block",{title:__("Section container block"),icon:"shield",category:"common",keywords:[__("Section"),__("Container"),__("Wrapper")],attributes:{backgroundImagePosition:{type:"string"},backgroundImageUrl:{type:"string",default:null},backgroundColor:{type:"string",default:null},stickySectionBackground:{type:"boolean"},sectionPadding:{type:"string",default:'{ "top":"0", "right":"0", "bottom":"0", "left":"0" }'},sectionMargin:{type:"string",default:'{ "top":"0", "bottom":"0" }'},backgroundAlignment:{type:"string",default:"none"},columnsAmount:{type:"number",default:"1"},sectionTitle:{type:"string",default:""},sectionTitleHeading:{type:"string",default:"h2"},sectionTitleAlignment:{type:"string",default:"left"},sectionEnableInlinePadding:{type:"boolean",default:!1},sectionEnableInlineMargin:{type:"boolean",default:!1},customAnchor:{type:"string"}},edit:function(e){function n(e,n){var t=JSON.parse(v);t[n]=e>0?e:0;var l=JSON.stringify(t);o({sectionPadding:l})}function t(e,n){var t=JSON.parse(E);t[n]=e>0?e:0;var l=JSON.stringify(t);o({sectionMargin:l})}function l(e){o({backgroundImageUrl:e.sizes.full.url})}function a(e){o({backgroundImageUrl:null})}var o=(e.className,e.setAttributes),c=(e.setState,e.clientId,e.attributes),m=(e.withState,c.backgroundImagePosition),y=c.stickySectionBackground,v=c.sectionPadding,E=c.sectionMargin,h=c.backgroundColor,C=c.columnsAmount,N=c.backgroundImageUrl,I=c.backgroundAlignment,B=c.sectionTitle,A=c.sectionTitleHeading,S=c.sectionTitleAlignment,O=c.sectionEnableInlinePadding,x=c.sectionEnableInlineMargin,P=c.customAnchor;e.className="wp-block-fp-section-container-block section";var T=void 0;""!==h&&(T={backgroundColor:h});var M=void 0;""!==N&&null!==N&&(M={backgroundImage:"url("+c.backgroundImageUrl+")"});var _=void 0;""!==N&&null!==N&&(_={backgroundPosition:m});var H=void 0;""!==N&&null!==N&&1==y&&(H={backgroundAttachment:"fixed"});var U=void 0;I&&"none"!==I&&(U=I);var j=JSON.parse(v),J=JSON.parse(E),q=void 0,z=void 0,R=wp.data.select("core/editor").getEditorSettings().colors;return[wp.element.createElement(r,null,wp.element.createElement(g,{title:__("Anchor","fancypantsy-section-container-block"),initialOpen:!1},wp.element.createElement(f,null,wp.element.createElement("div",{className:"fp-custom-anchor-wrapper"},function(){return!(!P||""===P)&&wp.element.createElement("div",{class:"anchor-example"},wp.element.createElement("p",null,__("Use the strong element as a link for this section","fancypantsy-section-container-block")),wp.element.createElement("strong",null,"#",P))}(),wp.element.createElement(p,{label:__("Anchor","fancypantsy-section-container-block"),placeholder:"#Anchor",value:P,onChange:function(e){return o({customAnchor:e})}})))),wp.element.createElement(g,{title:__("Settings","fancypantsy-section-container-block"),initialOpen:!0},wp.element.createElement(f,null,wp.element.createElement(p,{label:__("Section title","fancypantsy-section-container-block"),placeholder:__("Enter your section title here","fancypantsy-section-container-block"),value:B,onChange:function(e){return o({sectionTitle:e})}})),wp.element.createElement(f,null,wp.element.createElement(u,{label:__("Section title heading","fancypantsy-section-container-block"),value:A,selected:A,className:"title-heading-panel",options:[{value:"h1",label:__("H1","fancypantsy-section-container-block")},{value:"h2",label:__("H2","fancypantsy-section-container-block")},{value:"h3",label:__("H3","fancypantsy-section-container-block")},{value:"h4",label:__("H4","fancypantsy-section-container-block")},{value:"h5",label:__("H5","fancypantsy-section-container-block")},{value:"h6",label:__("H6","fancypantsy-section-container-block")}],onChange:function(e){return o({sectionTitleHeading:e})}})),function(){return""!==B&&[wp.element.createElement(f,null,wp.element.createElement(u,{label:__("Section title alignment","fancypantsy-section-container-block"),value:S,selected:S,options:[{value:"left",label:__("Align Left","fancypantsy-section-container-block")},{value:"center",label:__("Align center","fancypantsy-section-container-block")},{value:"right",label:__("Align right","fancypantsy-section-container-block")}],onChange:function(e){return o({sectionTitleAlignment:e})}}))]}(),wp.element.createElement(f,null,wp.element.createElement(b,{label:__("Amount of blocks","fancypantsy-section-container-block"),value:C,options:[{value:"1",label:__("1","fancypantsy-section-container-block")},{value:"2",label:__("2","fancypantsy-section-container-block")},{value:"3",label:__("3","fancypantsy-section-container-block")},{value:"4",label:__("4","fancypantsy-section-container-block")}],onChange:function(e){return o({columnsAmount:parseInt(e)})}}))),wp.element.createElement(g,{title:__("Background","fancypantsy-section-container-block"),initialOpen:!1},wp.element.createElement(f,null,wp.element.createElement("div",{className:"components-base-control"},wp.element.createElement("label",{class:"components-base-control__label"},__("Image","fancypantsy-section-container-block")),wp.element.createElement(s,{onSelect:l,render:function(e){var n=e.open;return wp.element.createElement("img",{className:"components-img",src:N,onClick:n})}}),wp.element.createElement("div",{class:"section-media-upload"},wp.element.createElement(s,{onSelect:l,render:function(e){var n=e.open;return wp.element.createElement("button",{type:"button",className:"components-button is-primary is-default",src:N,onClick:n},__("Add image","fancypantsy-section-container-block"))}}),function(){return null==N?"":wp.element.createElement("span",{class:"remove-section-img",onClick:a}," ",__("Remove","fancypantsy-section-container-block")," ")}()))),function(){return null==N?"":[wp.element.createElement(f,null,wp.element.createElement(d,{label:__("Sticky background","fancypantsy-section-container-block"),checked:y,onChange:function(e){o({stickySectionBackground:e})}})),wp.element.createElement(f,null,wp.element.createElement(b,{label:__("Background position","fancypantsy-section-container-block"),value:m,options:[{value:"top left",label:__("Top left","fancypantsy-section-container-block")},{value:"top center",label:__("Top center","fancypantsy-section-container-block")},{value:"Boven rechts",label:__("Top right","fancypantsy-section-container-block")},{value:"center left",label:__("Center left","fancypantsy-section-container-block")},{value:"center center",label:__("Center center","fancypantsy-section-container-block")},{value:"center right",label:__("Center right","fancypantsy-section-container-block")},{value:"bottom left",label:__("Bottom left","fancypantsy-section-container-block")},{value:"bottom center",label:__("Bottom center","fancypantsy-section-container-block")},{value:"bottom right",label:__("Bottom right","fancypantsy-section-container-block")}],onChange:function(e){return o({backgroundImagePosition:e})}}))]}(),wp.element.createElement(f,null,wp.element.createElement("div",null,wp.element.createElement("label",{class:"components-base-control__label"},__("Background color","fancypantsy-section-container-block")),wp.element.createElement(k,{colors:R,value:"transparent",disableCustomColors:"false",onChange:function(e){return o({backgroundColor:e})}}))),function(){if(null!==N||null!==h)return[wp.element.createElement(f,null,wp.element.createElement(b,{label:__("Background alignment","fancypantsy-section-container-block"),value:I,options:[{value:"none",label:__("Align center","fancypantsy-section-container-block")},{value:"align-left",label:__("Align left","fancypantsy-section-container-block")},{value:"align-right",label:__("Align right","fancypantsy-section-container-block")},{value:"align-fullwidth",label:__("Fullwidth","fancypantsy-section-container-block")}],onChange:function(e){return o({backgroundAlignment:e})}}))]}()),wp.element.createElement(g,{title:__("Whitespace","fancypantsy-section-container-block"),initialOpen:!1},wp.element.createElement(f,null,wp.element.createElement(d,{label:__("Inline padding","fancypantsy-section-container-block"),checked:O,onChange:function(e){o({sectionEnableInlinePadding:e})}})),function(){return!(!O||!0!==O)&&(0!==j&&(q={padding:+parseInt(j.top)+"px "+parseInt(j.right)+"px "+parseInt(j.bottom)+"px "+parseInt(j.left)+"px"}),[wp.element.createElement("div",null,wp.element.createElement("div",{class:"padding-wrapper"},wp.element.createElement("div",{class:"custom-label"},"Padding ",wp.element.createElement("small",null,"(in px)")),wp.element.createElement(p,{type:"number",label:"Top",className:"quarter-size",value:j.top,onChange:function(e){return n(e,"top")}}),wp.element.createElement(p,{type:"number",label:"Right",className:"quarter-size",value:j.right,onChange:function(e){return n(e,"right")}}),wp.element.createElement(p,{type:"number",label:"Bottom",className:"quarter-size",value:j.bottom,onChange:function(e){return n(e,"bottom")}}),wp.element.createElement(p,{type:"number",label:"Left",className:"quarter-size",value:j.left,onChange:function(e){return n(e,"left")}})))])}(),wp.element.createElement(f,null,wp.element.createElement(d,{label:__("Inline margin","fancypantsy-section-container-block"),checked:x,onChange:function(e){o({sectionEnableInlineMargin:e})}})),function(){return!(!x||!0!==x)&&(0!==J&&(z={marginTop:+parseInt(J.top)+"px",marginBottom:+parseInt(J.bottom)+"px"}),[wp.element.createElement("div",null,wp.element.createElement("div",{class:"margin-wrapper"},wp.element.createElement("div",{class:"custom-label"},"Margin ",wp.element.createElement("small",null,"(in px)")),wp.element.createElement(p,{type:"number",label:"Top",className:"quarter-size",value:J.top,onChange:function(e){return t(e,"top")}}),wp.element.createElement(p,{type:"number",label:"Bottom",className:"quarter-size",value:J.bottom,onChange:function(e){return t(e,"bottom")}})))])}())),wp.element.createElement("div",{"data-section-bg-alignment":U,className:e.className,style:Object.assign({},z)},function(){return!(!P||""===P)&&wp.element.createElement("div",{id:P,className:"section-anchor"})}(),wp.element.createElement("div",{className:"container",style:Object.assign({},q)},wp.element.createElement("div",{className:"background-element",style:Object.assign({},_,M,T,H)}),function(){var e=void 0;return e="section-title",S&&""!==B&&(e+=" text-align-"+S),""!==B&&"h1"==A?[wp.element.createElement("h1",{className:e},B)]:""!==B&&"h2"==A?[wp.element.createElement("h2",{className:e},B)]:""!==B&&"h3"==A?[wp.element.createElement("h3",{className:e},B)]:""!==B&&"h4"==A?[wp.element.createElement("h4",{className:e},B)]:""!==B&&"h5"==A?[wp.element.createElement("h5",{className:e},B)]:""!==B&&"h6"==A&&[wp.element.createElement("h6",{className:e},B)]}(),wp.element.createElement(i,{template:w(parseInt(C),function(){return["fp/column-block"]}),templateLock:"all",allowedBlocks:["fp/column-block"]})))]},save:function(e){var n=(e.className,e.setAttributes,e.setState,e.attributes),t=(e.withState,n.backgroundImagePosition),l=n.stickySectionBackground,a=n.sectionPadding,o=n.sectionMargin,c=n.backgroundColor,r=n.columnsAmount,s=n.backgroundImageUrl,m=n.backgroundAlignment,p=n.sectionTitle,u=n.sectionTitleHeading,b=n.sectionTitleAlignment,d=n.sectionEnableInlinePadding,g=n.sectionEnableInlineMargin,f=n.customAnchor;e.className="wp-block-fp-section-container-block section";var k=void 0;""!==c&&(k={backgroundColor:c});var y=void 0;""!==s&&null!==s&&(y={backgroundImage:"url("+n.backgroundImageUrl+")"});var w=void 0;""!==s&&null!==s&&(w={backgroundPosition:t});var v=void 0;""!==s&&null!==s&&1==l&&(v={backgroundAttachment:"fixed"});var E=void 0;m&&"none"!==m&&(E=m);var h=JSON.parse(a),C=JSON.parse(o),N=void 0,I=void 0;d&&!0===d&&0!==h&&(N={padding:+parseInt(h.top)+"px "+parseInt(h.right)+"px "+parseInt(h.bottom)+"px "+parseInt(h.left)+"px"}),g&&!0===g&&0!==C&&(I={marginTop:+parseInt(C.top)+"px",marginBottom:+parseInt(C.bottom)+"px"});var B=(wp.data.select("core/editor").getEditorSettings().colors,void 0);return r&&(B="block-row blocks-in-row-"+r),wp.element.createElement("section",{"data-section-bg-alignment":E,className:e.className,style:Object.assign({},I)},function(){return!(!f||""===f)&&wp.element.createElement("div",{id:f,className:"section-anchor"})}(),wp.element.createElement("div",{className:"container",style:Object.assign({},N)},wp.element.createElement("div",{className:"background-element",style:Object.assign({},w,y,k,v)}),function(){var e=void 0;return e="section-title",b&&""!==p&&(e+=" text-align-"+b),""!==p&&"h1"==u?[wp.element.createElement("h1",{className:e},p)]:""!==p&&"h2"==u?[wp.element.createElement("h2",{className:e},p)]:""!==p&&"h3"==u?[wp.element.createElement("h3",{className:e},p)]:""!==p&&"h4"==u?[wp.element.createElement("h4",{className:e},p)]:""!==p&&"h5"==u?[wp.element.createElement("h5",{className:e},p)]:""!==p&&"h6"==u&&[wp.element.createElement("h6",{className:e},p)]}(),wp.element.createElement("div",{className:B},wp.element.createElement(i.Content,null))))}})},function(e,n){},function(e,n){},function(e,n,t){"use strict";function l(){return fpscbglobal.allowedColumnBlocks[0]}var a=t(5),o=(t.n(a),t(6)),__=(t.n(o),wp.i18n.__),c=wp.blocks.registerBlockType,i=wp.blockEditor,r=i.InnerBlocks,s=(i.InspectorControls,i.MediaUpload,wp.components),m=s.Button,p=s.Modal,u=wp.compose.withState,b=u({isOpen:!1})(function(e){var n=e.isOpen,t=e.setState,a=e.setEdit,o=e.setPreview,c=e.setInnerBlocksCount;return wp.element.createElement("div",null,0==n&&wp.element.createElement(r,{allowedBlocks:l(),templateLock:!1}),1==c&&wp.element.createElement(m,{isDefault:!0,onClick:function(){return t({isOpen:!0},a)}},__("Edit in modal","fancypantsy-section-container-block")),n&&wp.element.createElement(p,{title:__("Edit block","fancypantsy-section-container-block"),className:"custom-innerblock-modal",onRequestClose:function(){return t({isOpen:!1},o)},shouldCloseOnClickOutside:!1},wp.element.createElement(r,{allowedBlocks:l(),templateLock:!1}),wp.element.createElement("div",{className:"hide-modal-btn-wrapper"},wp.element.createElement(m,{className:"components-button is-button is-primary",isDefault:!0,onClick:function(){return t({isOpen:!1},o)}},__("Hide modal","fancypantsy-section-container-block")))))});c("fp/column-block",{title:__("Column block"),icon:"shield",category:"common",parent:["fp/section-container-block"],keywords:[__("Column block","fancypantsy-section-container-block"),__("Column","fancypantsy-section-container-block")],edit:function(e){var n=(e.className,e.setAttributes,e.setState,e.clientId),t=(e.attributes,e.withState,function(e){if(null!=wp.data.select("core/block-editor").getBlocksByClientId(n)[0].innerBlocks){var t=wp.data.select("core/block-editor").getBlocksByClientId(n)[0].innerBlocks[0];wp.data.dispatch("core/block-editor").updateBlockAttributes(t.clientId,{mode:"edit"})}}),l=function(e){if(null!=wp.data.select("core/block-editor").getBlocksByClientId(n)[0].innerBlocks){var t=wp.data.select("core/block-editor").getBlocksByClientId(n)[0].innerBlocks[0];wp.data.dispatch("core/block-editor").updateBlockAttributes(t.clientId,{mode:"preview"})}};return e.className="wp-block-fp-column-block column",[wp.element.createElement("div",{className:e.className},wp.element.createElement(b,{setEdit:t,setPreview:l,setInnerBlocksCount:function(){if(null!=wp.data.select("core/block-editor").getBlocksByClientId(n)[0]){return 0!==wp.data.select("core/block-editor").getBlocksByClientId(n)[0].innerBlocks.length}}()}))]},save:function(e){e.className,e.setAttributes,e.setState,e.clientId,e.attributes,e.withState;return e.className="wp-block-fp-column-block column",wp.element.createElement("div",{className:e.className},wp.element.createElement(r.Content,null))}})},function(e,n){},function(e,n){}]);