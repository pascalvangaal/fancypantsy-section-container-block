/**
 * BLOCK: fancypantsy-section-container-block
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './editor.scss';
import './style.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n

const { 
	registerBlockType,
} = wp.blocks; // Import registerBlockType() from wp.blocks

const { 
    InnerBlocks,
    InspectorControls,
    MediaUpload
} = wp.blockEditor;

const {
    TextControl,
    CheckboxControl,
    RadioControl,
    SelectControl,
    TextareaControl,
    ToggleControl,
    RangeControl,
    Panel,
    PanelBody,
    PanelRow,
    ColorPalette
} = wp.components;

const {
    Fragment
} = wp.element;

const { times } = lodash;

console.log(wp.i18n.__('Settings', 'fancypantsy-section-container-block'));

/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'fp/section-container-block', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Section container block' ), // Block title.
	icon: 'shield', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'Section' ),
		__( 'Container' ),
		__( 'Wrapper' ),
	],
	attributes: {
	    backgroundImagePosition: {
			type: 'string',
		},
	    backgroundImageUrl: {
        	type: 'string',
        	default: null
    	},
    	backgroundColor: {
    		type: 'string',
        	default: null
    	},
    	stickySectionBackground: {
        	type: 'boolean',
    	},
    	sectionPadding: {
    		type: 'string',
    		default: '{ "top":"0", "right":"0", "bottom":"0", "left":"0" }',
    	},
    	sectionMargin: {
    		type: 'string',
    		default: '{ "top":"0", "bottom":"0" }',
    	},
    	backgroundAlignment: {
			type: 'string',
			default: 'none'
		},
    	columnsAmount: {
            type: 'number',
            default: '1'
        },
        sectionTitle: {
            type: 'string',
            default: '',
        },
        sectionTitleHeading: {
        	type: 'string',
        	default: 'h2'
        },
        sectionTitleAlignment: {
        	type: 'string',
        	default: 'left'
        },
        sectionEnableInlinePadding: {
        	type: 'boolean',
        	default: false,
        },
        sectionEnableInlineMargin: {
        	type: 'boolean',
        	default: false,
        },
        customAnchor: {
        	type: 'string',
        }
	},

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Component.
	 */
	edit: ( props ) => {

		const { className, setAttributes, setState, clientId } = props;

		const { attributes, withState } = props;

		const {
			backgroundImagePosition,
			stickySectionBackground,
			sectionPadding,
			sectionMargin,
			backgroundColor,
			columnsAmount,
			backgroundImageUrl,
			backgroundAlignment,
			sectionTitle,
			sectionTitleHeading,
			sectionTitleAlignment,
			sectionEnableInlinePadding,
			sectionEnableInlineMargin,
			customAnchor
		} = attributes;

		let customAnchorVar;

		props.className = 'wp-block-fp-section-container-block section';

		function customAnchorFunction(){
			if( customAnchor && customAnchor !== '' ){
				return(
					<div id={ customAnchor } className="section-anchor"></div>
				);
			} else {
				return false;
			}
		}

		let backgroundColorVal;

		if( backgroundColor !== '' ){
			backgroundColorVal = { backgroundColor: backgroundColor };
		}

		let backgroundImageVar;

		if( backgroundImageUrl !== '' && backgroundImageUrl !== null ){
			backgroundImageVar = { backgroundImage: 'url('+attributes.backgroundImageUrl+')' };
		}

		let backgroundPositionVar;

		if( backgroundImageUrl !== '' && backgroundImageUrl !== null ){
			backgroundPositionVar = { backgroundPosition: backgroundImagePosition };
		}

		let stickyBackgroundVar;

		if( backgroundImageUrl !== '' && backgroundImageUrl !== null && stickySectionBackground == true ){
			stickyBackgroundVar = { backgroundAttachment: 'fixed' };
		}

		let sectionBGAlignment;

	    if( backgroundAlignment && backgroundAlignment !== 'none' ){
	    	sectionBGAlignment = backgroundAlignment;
	    }

		let customPaddingObj = JSON.parse( sectionPadding );
		let customMarginObj = JSON.parse( sectionMargin );

		let paddingStyles;
		let marginStyles;

		function saveSectionPadding( value, position ){

			let customObject = JSON.parse( sectionPadding );

			if( value > 0 ){ 
				customObject[position] = value;
			} else {
				customObject[position] = 0;
			}

			let jsonString = JSON.stringify( customObject );

			setAttributes( { sectionPadding : jsonString } );
		};

		function saveSectionMargin( value, position ){

			let customObject = JSON.parse( sectionMargin );

			if( value > 0 ){ 
				customObject[position] = value;
			} else {
				customObject[position] = 0;
			}

			let jsonString = JSON.stringify( customObject );

			setAttributes( { sectionMargin : jsonString } );
		};

		function selectImage(value) {
		    setAttributes({
		        backgroundImageUrl: value.sizes.full.url,
		    })
		};

		function removeImage(value) {
		    setAttributes({
		        backgroundImageUrl: null,
		    })
		};

		let bgColors = wp.data.select( 'core/editor' ).getEditorSettings().colors;

    	let color = 'transparent';

		function backgroundPosition(){
			if( backgroundImageUrl !== null || backgroundColor !== null ){

				return [

					<PanelRow>

						<SelectControl
							label={ __( 'Background alignment', 'fancypantsy-section-container-block' ) }
							value={ backgroundAlignment }
							options={ [
								{
									value: 'none',
									label: __( 'Align center', 'fancypantsy-section-container-block' ),
								},
								{
									value: 'align-left',
									label: __( 'Align left', 'fancypantsy-section-container-block' ),
								},
								{
									value: 'align-right',
									label: __( 'Align right', 'fancypantsy-section-container-block' ),
								},
								{
									value: 'align-fullwidth',
									label: __( 'Fullwidth', 'fancypantsy-section-container-block' ),
								},
							] }

							onChange={ ( value ) => setAttributes( { backgroundAlignment: value } ) }
						/>

					</PanelRow>

				];
			}
		}

		function backgroundImgExtraFields(){

			if( backgroundImageUrl == null ){
				return '';
			}

			return[
				<PanelRow>
					<ToggleControl
				        label={__( 'Sticky background', 'fancypantsy-section-container-block' ) }
				        checked={ stickySectionBackground }
				        onChange={ ( stickySectionBackground ) => { setAttributes( { stickySectionBackground: stickySectionBackground } ) } }
				    />
				</PanelRow>,
				<PanelRow>
					<SelectControl
						label={ __( 'Background position', 'fancypantsy-section-container-block' ) }
						value={ backgroundImagePosition }
						options={ [
							{
								value: 'top left',
								label: __( 'Top left', 'fancypantsy-section-container-block' ),
							},
							{
								value: 'top center',
								label: __( 'Top center', 'fancypantsy-section-container-block' ),
							},
							{
								value: 'Boven rechts',
								label: __( 'Top right', 'fancypantsy-section-container-block' ),
							},
							{
								value: 'center left',
								label: __( 'Center left', 'fancypantsy-section-container-block' ),
							},
							{
								value: 'center center',
								label: __( 'Center center', 'fancypantsy-section-container-block' ),
							},
							{
								value: 'center right',
								label: __( 'Center right', 'fancypantsy-section-container-block' ),
							},
							{
								value: 'bottom left',
								label: __( 'Bottom left', 'fancypantsy-section-container-block' ),
							},
							{
								value: 'bottom center',
								label: __( 'Bottom center', 'fancypantsy-section-container-block' ),
							},
							{
								value: 'bottom right',
								label: __( 'Bottom right', 'fancypantsy-section-container-block' ),
							},
						] }

						onChange={ ( selectedOption ) => setAttributes( { backgroundImagePosition: selectedOption } ) }
					/>
				</PanelRow>
			];
		};

		function removeBackgroundImageBtn(){

			if( backgroundImageUrl == null ){
				return '';
			}

			return(
				<span class="remove-section-img" onClick={removeImage}> { __( 'Remove', 'fancypantsy-section-container-block' ) } </span>
			);
		};

		function headingFunction(){

			let customClassName;

			customClassName = 'section-title';

			if( sectionTitleAlignment && sectionTitle !== '' ){
				customClassName += ' text-align-'+sectionTitleAlignment;
			}

			if( sectionTitle !== '' && sectionTitleHeading == 'h1' ){
				return [
					<h1 className={ customClassName }>{sectionTitle}</h1>
				];
			} else if( sectionTitle !== '' && sectionTitleHeading == 'h2' ){
				return[
					<h2 className={ customClassName }>{sectionTitle}</h2>
				];
			} else if( sectionTitle !== '' && sectionTitleHeading == 'h3' ){
				return [
					<h3 className={ customClassName }>{sectionTitle}</h3>
				];
			} else if( sectionTitle !== '' && sectionTitleHeading == 'h4' ){
				return [
					<h4 className={ customClassName }>{sectionTitle}</h4>
				];
			} else if( sectionTitle !== '' && sectionTitleHeading == 'h5' ){
				return [
					<h5 className={ customClassName }>{sectionTitle}</h5>
				];
			} else if( sectionTitle !== '' && sectionTitleHeading == 'h6' ){
				return [
					<h6 className={ customClassName }>{sectionTitle}</h6>
				];
			} else {
				return false;
			}
		}

		function sectionTitleAlignmentFunction(){

			if( sectionTitle !== '' ){ 
				return[
					<PanelRow>

						<RadioControl
							label={ __( 'Section title alignment', 'fancypantsy-section-container-block' ) }
							value={ sectionTitleAlignment }
							selected={ sectionTitleAlignment }
							options={ [
								{
									value: 'left',
									label: __( 'Align Left', 'fancypantsy-section-container-block' ),
								},
								{
									value: 'center',
									label: __( 'Align center', 'fancypantsy-section-container-block' ),
								},
								{
									value: 'right',
									label: __( 'Align right', 'fancypantsy-section-container-block' ),
								},
							] }

							onChange={ ( value ) => setAttributes( { sectionTitleAlignment: value } ) }
						/>

					</PanelRow>
				];
			} else {
				return false;
			}
		}

		function anchorExample(){

			if( customAnchor && customAnchor !== '' ){ 

				return(
					<div class="anchor-example">
						<p>{__( 'Use the strong element as a link for this section', 'fancypantsy-section-container-block' )}</p>
						<strong>#{ customAnchor }</strong>
					</div>
				);

			} else {

				return false;
			}
		}

		
		function paddingWhitespaceFields(){

			if( sectionEnableInlinePadding && sectionEnableInlinePadding === true ){

				if( customPaddingObj !== 0 ){ 
					paddingStyles = { padding: + parseInt( customPaddingObj.top ) + 'px' + ' ' + parseInt( customPaddingObj.right ) + 'px' + ' ' + parseInt( customPaddingObj.bottom ) + 'px' + ' ' +  parseInt( customPaddingObj.left ) + 'px' };
				}

				return [

					<div>
							
						<div class="padding-wrapper">
							<div class="custom-label">Padding <small>(in px)</small></div>
						    <TextControl
								type="number"
						        label="Top"
						        className='quarter-size'
						        value={ customPaddingObj.top }
							 	onChange={ (value) => saveSectionPadding( value, 'top' ) }		   
							 />

							 <TextControl
								type="number"
						        label="Right"
						        className='quarter-size'
						        value={ customPaddingObj.right }
							 	onChange={ (value) => saveSectionPadding( value, 'right' ) }		   
							 />

							 <TextControl
								type="number"
						        label="Bottom"
						        className='quarter-size'
						        value={ customPaddingObj.bottom }
							 	onChange={ (value) => saveSectionPadding( value, 'bottom' ) }		   
							 />

							 <TextControl
								type="number"
						        label="Left"
						        className='quarter-size'
						        value={ customPaddingObj.left }
							 	onChange={ (value) => saveSectionPadding( value, 'left' ) }		   
							 />

						</div>

					</div>
				];

			} else {
				return false;
			}

		}

		function marginWhitespaceFields(){

			if( sectionEnableInlineMargin && sectionEnableInlineMargin === true ){

				if( customMarginObj !== 0 ){ 
					marginStyles = { marginTop: + parseInt( customMarginObj.top ) + 'px', marginBottom: + parseInt( customMarginObj.bottom ) + 'px' };
				}

				return [

				<div>

					<div class="margin-wrapper">
						<div class="custom-label">Margin <small>(in px)</small></div>
						<TextControl
							type="number"
							label="Top"
							className='quarter-size'
							value={ customMarginObj.top }
								onChange={ (value) => saveSectionMargin( value, 'top' ) }		   
						/>

						<TextControl
							type="number"
							label="Bottom"
							className='quarter-size'
							value={ customMarginObj.bottom }
							onChange={ (value) => saveSectionMargin( value, 'bottom' ) }		   
						/>

					</div>

				</div>
				];

			} else {
				return false;
			}

		}

		return [
			<InspectorControls>
				<PanelBody
					title={ __( 'Anchor', 'fancypantsy-section-container-block' ) }
					initialOpen={ false }
				>
					<PanelRow>
						<div className="fp-custom-anchor-wrapper">
							{ anchorExample() }

							<TextControl
						        label={ __( 'Anchor', 'fancypantsy-section-container-block' ) }
						        placeholder="#Anchor"
						        value={ customAnchor }
						        onChange={ ( value ) => setAttributes( { customAnchor: value } ) }
						    />
						</div>
					</PanelRow>
				</PanelBody>
				<PanelBody
					title={ __( 'Settings', 'fancypantsy-section-container-block' ) }
					initialOpen={ true }
				>
					<PanelRow>

						<TextControl
					        label={__( 'Section title', 'fancypantsy-section-container-block' ) }
					        placeholder={__( 'Enter your section title here', 'fancypantsy-section-container-block' ) }
					        value={ sectionTitle }
					        onChange={ ( value ) => setAttributes( { sectionTitle: value } ) }
					    />

					</PanelRow>
					<PanelRow>

						<RadioControl
							label={ __( 'Section title heading', 'fancypantsy-section-container-block' ) }
							value={ sectionTitleHeading }
							selected={ sectionTitleHeading }
							className='title-heading-panel'
							options={ [
								{
									value: 'h1',
									label: __( 'H1', 'fancypantsy-section-container-block' ),
								},
								{
									value: 'h2',
									label: __( 'H2', 'fancypantsy-section-container-block' ),
								},
								{
									value: 'h3',
									label: __( 'H3', 'fancypantsy-section-container-block' ),
								},
								{
									value: 'h4',
									label: __( 'H4', 'fancypantsy-section-container-block' ),
								},
								{
									value: 'h5',
									label: __( 'H5', 'fancypantsy-section-container-block' ),
								},
								{
									value: 'h6',
									label: __( 'H6', 'fancypantsy-section-container-block' ),
								},
							] }

							onChange={ ( value ) => setAttributes( { sectionTitleHeading: value } ) }
						/>

					</PanelRow>
					{ sectionTitleAlignmentFunction() }
					<PanelRow>

						<SelectControl
							label={ __( 'Amount of blocks', 'fancypantsy-section-container-block' ) }
							value={ columnsAmount }
							options={ [
								{
									value: '1',
									label: __( '1', 'fancypantsy-section-container-block' ),
								},
								{
									value: '2',
									label: __( '2', 'fancypantsy-section-container-block' ),
								},
								{
									value: '3',
									label: __( '3', 'fancypantsy-section-container-block' ),
								},
								{
									value: '4',
									label: __( '4', 'fancypantsy-section-container-block' ),
								},
							] }

							onChange={ ( value ) => setAttributes( { columnsAmount: parseInt(value) } ) }
						/>

					</PanelRow>
				</PanelBody>
				
				<PanelBody
					title={ __( 'Background', 'fancypantsy-section-container-block' ) }
					initialOpen={ false }
				>

					<PanelRow>
						
						<div className="components-base-control">
							
							<label class="components-base-control__label">{ __( 'Image', 'fancypantsy-section-container-block' ) }</label>
							<MediaUpload 
								onSelect={selectImage}
								render={ ({open}) => {
									return <img 
										className={'components-img'}
										src={backgroundImageUrl}
										onClick={open}
									/>;
								}}
							/>

							<div class="section-media-upload">
								<MediaUpload 
									onSelect={selectImage}
									render={ ({open}) => {
										return <button 
											type={'button'}
											className={'components-button is-primary is-default'}
											src={backgroundImageUrl}
											onClick={open}
											>{ __( 'Add image', 'fancypantsy-section-container-block' ) }
										</button>;
									}}
								/>

								{ removeBackgroundImageBtn() }

							</div>

						</div>

					</PanelRow>

					{ backgroundImgExtraFields() }

					<PanelRow>
						
						<div>
							<label class="components-base-control__label">{ __( 'Background color', 'fancypantsy-section-container-block' ) }</label>

							<ColorPalette
					            colors={ bgColors }
					            value={ color }
					            disableCustomColors = 'false'
					           	onChange={ ( value ) => setAttributes( { backgroundColor: value } ) }
					        />
				        </div>

					</PanelRow>

					{ backgroundPosition() }

				</PanelBody>
				<PanelBody
					title={ __( 'Whitespace', 'fancypantsy-section-container-block' ) }
					initialOpen={ false }
				>
					<PanelRow>
						
						<ToggleControl
					        label={ __( 'Inline padding', 'fancypantsy-section-container-block' ) }
					        checked={ sectionEnableInlinePadding }
					        onChange={ ( sectionEnableInlinePadding ) => { setAttributes( { sectionEnableInlinePadding: sectionEnableInlinePadding } ) } }
					    />
				    	
				    </PanelRow>
				    { paddingWhitespaceFields() }

				    <PanelRow>
						
						<ToggleControl
					        label={ __( 'Inline margin', 'fancypantsy-section-container-block' ) }
					        checked={ sectionEnableInlineMargin }
					        onChange={ ( sectionEnableInlineMargin ) => { setAttributes( { sectionEnableInlineMargin: sectionEnableInlineMargin } ) } }
					    />
				    	
				    </PanelRow>
				    { marginWhitespaceFields() }
				 
				</PanelBody>

			</InspectorControls>,
			<div data-section-bg-alignment={sectionBGAlignment} className={ props.className } style={{ ...marginStyles }}>
				{ customAnchorFunction() }
				<div className="container" style={{...paddingStyles}}>
					<div className="background-element" style={{...backgroundPositionVar, ...backgroundImageVar, ...backgroundColorVal, ...stickyBackgroundVar }}></div>
					{ headingFunction() }
					<InnerBlocks 
	   				 	template={ times( parseInt(columnsAmount), () => [ 'fp/column-block' ] ) }
	   				 	templateLock="all"
	   				 	allowedBlocks={ [ 'fp/column-block' ] }
		   			/>
	   			</div>
			</div>
		];
	},

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Frontend HTML.
	 */
	save: ( props ) => {

		const { className, setAttributes, setState } = props;

		const { attributes, withState } = props;

		const {
			backgroundImagePosition,
			stickySectionBackground,
			sectionPadding,
			sectionMargin,
			backgroundColor,
			columnsAmount,
			backgroundImageUrl,
			backgroundAlignment,
			sectionTitle,
			sectionTitleHeading,
			sectionTitleAlignment,
			sectionEnableInlinePadding,
			sectionEnableInlineMargin,
			customAnchor
		} = attributes;

		let customAnchorVar;

		props.className = 'wp-block-fp-section-container-block section';

		function customAnchorFunction(){
			if( customAnchor && customAnchor !== '' ){
				return(
					<div id={ customAnchor } className="section-anchor"></div>
				);
			} else {
				return false;
			}
		}

		function headingFunction(){

			let customClassName;

			customClassName = 'section-title';

			if( sectionTitleAlignment && sectionTitle !== '' ){
				customClassName += ' text-align-'+sectionTitleAlignment;
			}

			if( sectionTitle !== '' && sectionTitleHeading == 'h1' ){
				return [
					<h1 className={ customClassName }>{sectionTitle}</h1>
				];
			} else if( sectionTitle !== '' && sectionTitleHeading == 'h2' ){
				return[
					<h2 className={ customClassName }>{sectionTitle}</h2>
				];
			} else if( sectionTitle !== '' && sectionTitleHeading == 'h3' ){
				return [
					<h3 className={ customClassName }>{sectionTitle}</h3>
				];
			} else if( sectionTitle !== '' && sectionTitleHeading == 'h4' ){
				return [
					<h4 className={ customClassName }>{sectionTitle}</h4>
				];
			} else if( sectionTitle !== '' && sectionTitleHeading == 'h5' ){
				return [
					<h5 className={ customClassName }>{sectionTitle}</h5>
				];
			} else if( sectionTitle !== '' && sectionTitleHeading == 'h6' ){
				return [
					<h6 className={ customClassName }>{sectionTitle}</h6>
				];
			} else {
				return false;
			}
		}

		let backgroundColorVal;

		if( backgroundColor !== '' ){
			backgroundColorVal = { backgroundColor: backgroundColor };
		}

		let backgroundImageVar;

		if( backgroundImageUrl !== '' && backgroundImageUrl !== null ){
			backgroundImageVar = { backgroundImage: 'url('+attributes.backgroundImageUrl+')' };
		}

		let backgroundPositionVar;

		if( backgroundImageUrl !== '' && backgroundImageUrl !== null ){
			backgroundPositionVar = { backgroundPosition: backgroundImagePosition };
		}

		let stickyBackgroundVar;

		if( backgroundImageUrl !== '' && backgroundImageUrl !== null && stickySectionBackground == true ){
			stickyBackgroundVar = { backgroundAttachment: 'fixed' };
		}

		let sectionBGAlignment;

	    if( backgroundAlignment && backgroundAlignment !== 'none' ){
	    	sectionBGAlignment = backgroundAlignment;
	    }

		let customPaddingObj = JSON.parse( sectionPadding );
		let customMarginObj = JSON.parse( sectionMargin );

		let paddingStyles;
		let marginStyles;

		if( sectionEnableInlinePadding && sectionEnableInlinePadding === true ){

			if( customPaddingObj !== 0 ){ 
				paddingStyles = { padding: + parseInt( customPaddingObj.top ) + 'px' + ' ' + parseInt( customPaddingObj.right ) + 'px' + ' ' + parseInt( customPaddingObj.bottom ) + 'px' + ' ' +  parseInt( customPaddingObj.left ) + 'px' };
			}

		}

		if( sectionEnableInlineMargin && sectionEnableInlineMargin === true ){

			if( customMarginObj !== 0 ){ 
				marginStyles = { marginTop: + parseInt( customMarginObj.top ) + 'px', marginBottom: + parseInt( customMarginObj.bottom ) + 'px' };
			}

		}

		function saveSectionPadding( value, position ){

			let customObject = JSON.parse( sectionPadding );

			if( value > 0 ){ 
				customObject[position] = value;
			} else {
				customObject[position] = 0;
			}

			let jsonString = JSON.stringify( customObject );

			setAttributes( { sectionPadding : jsonString } );
		};

		function saveSectionMargin( value, position ){

			let customObject = JSON.parse( sectionMargin );

			if( value > 0 ){ 
				customObject[position] = value;
			} else {
				customObject[position] = 0;
			}

			let jsonString = JSON.stringify( customObject );

			setAttributes( { sectionMargin : jsonString } );
		};

		function selectImage(value) {
		    setAttributes({
		        backgroundImageUrl: value.sizes.full.url,
		    })
		};

		function removeImage(value) {
		    setAttributes({
		        backgroundImageUrl: null,
		    })
		};

		let bgColors = wp.data.select( 'core/editor' ).getEditorSettings().colors;

    	let color = 'transparent';

		let columnRowClass;

		if( columnsAmount ){
			columnRowClass = 'block-row blocks-in-row-'+columnsAmount;
		}

		return (
			<section data-section-bg-alignment={sectionBGAlignment} className={ props.className } style={{ ...marginStyles }}>
				{ customAnchorFunction() }
				<div className="container" style={{...paddingStyles}}>
					<div className="background-element" style={{...backgroundPositionVar, ...backgroundImageVar, ...backgroundColorVal, ...stickyBackgroundVar }}></div>
					{ headingFunction() }
					<div className={ columnRowClass }>
						<InnerBlocks.Content />
					</div>
				</div>
			</section>
		);
	},
} );
