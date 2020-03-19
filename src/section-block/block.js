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
	createBlock 
} = wp.blocks; // Import registerBlockType() from wp.blocks

const { 
    InnerBlocks,
    InspectorControls,
    MediaUpload,
    URLInputButton
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
    ColorPalette,
    FocalPointPicker
} = wp.components;

const { 
	withDispatch, 
	useDispatch, 
} = wp.data;

const { 
	times,
	dropRight, 
} = lodash;


const {
    Fragment
} = wp.element;

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
	icon: 'schedule', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'fancypantsy', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'Section' ),
		__( 'Container' ),
		__( 'Wrapper' ),
	],
	description: __( 'A fully customisable section container block', 'fancypantsy-section-container-block' ),
	attributes: {
	    backgroundImagePosition: {
			type: 'object',
			default: {x:0.5, y:0.5}
		},
	    backgroundImageUrl: {
        	type: 'string',
        	default: null
    	},
    	backgroundImageHeight: {
        	type: 'number',
        	default: null
    	},
    	backgroundImageWidth: {
        	type: 'number',
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
        },
        columnLayoutOption: {
        	type: 'string',
        },
        buttonUrl: {
        	type: 'string',
        },
        buttonTarget: {
        	type: 'boolean',
        	default: false,
        },
        buttonText: {
        	type: 'string',
        },
        buttonAlignment: {
        	type: 'text',
        	default: 'align-center'
        },
	},
	example: {
	    attributes: {
	        sectionTitle: 'Title',
	        backgroundColor: '#e3e3e3',
	        columnsAmount: '4',
	        backgroundAlignment: 'align-fullwidth',
	        sectionTitleAlignment: 'center',
	        sectionEnableInlinePadding: true,
	        sectionPadding: '{ "top":"20px", "right":"0", "bottom":"80px", "left":"0" }'

	    },
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
			backgroundImageHeight,
			backgroundImageWidth,
			backgroundAlignment,
			sectionTitle,
			sectionTitleHeading,
			sectionTitleAlignment,
			sectionEnableInlinePadding,
			sectionEnableInlineMargin,
			customAnchor,
			columnLayoutOption,
			buttonUrl,
			buttonText,
			buttonTarget,
			buttonAlignment
		} = attributes;

		let customAnchorVar;

		const TEMPLATE = [ [ 'fp/column-block', {} ] ];

		props.className = 'wp-block-fp-section-container-block section';

		function updateColumns( previousColumns, newColumns ) {

			setAttributes( { columnsAmount: parseInt(newColumns) } );

			//Set initial layout mode
			if( parseInt(newColumns) === 1 ){
				setAttributes( { columnLayoutOption: 'one-column-align-left' } );
			} else if( parseInt(newColumns) === 2 ){
				setAttributes( { columnLayoutOption: 'two-columns-equal' } );
			}

			const { replaceInnerBlocks } = wp.data.dispatch( 'core/block-editor' );
			const { getBlocks } = wp.data.select( 'core/block-editor' );

			let innerBlocks = getBlocks( clientId );

			const isAddingColumn = newColumns > previousColumns;

			if ( isAddingColumn ) {
				innerBlocks = [
					...innerBlocks,
					...times( newColumns - previousColumns, () => {
						return createBlock( 'fp/column-block' );
					} ),
				];
			} else {
				innerBlocks = dropRight(
					innerBlocks,
					previousColumns - newColumns
				);
			}

			replaceInnerBlocks( clientId, innerBlocks, false );
		}

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
			let bgXPos = (backgroundImagePosition.x * 100)+'%';
			let bgYPos = (backgroundImagePosition.y * 100)+'%';
			
			backgroundPositionVar = { backgroundPosition: bgXPos+' '+bgYPos };
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
		        backgroundImageHeight: value.height,
		        backgroundImageWidth: value.width,
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
					<FocalPointPicker
						label={ __( 'Focal Point Picker' ) }
						url={ backgroundImageUrl }
						dimensions={  {
							width: backgroundImageWidth,
					 		height: backgroundImageHeight
					 	} }
						value={ backgroundImagePosition }
						onChange={ ( value ) => setAttributes( { backgroundImagePosition: value } ) }
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

		function columnLayoutOptions(){

			if( columnsAmount === 1 ){

				return[
					<PanelRow>

						<SelectControl
							label={ __( 'Column layout option', 'fancypantsy-section-container-block' ) }
							value={ columnLayoutOption }
							options={ [
								{
									value: 'one-column-align-left',
									label: __( 'Left', 'fancypantsy-section-container-block' ),
								},
								{
									value: 'one-column-align-center',
									label: __( 'Center', 'fancypantsy-section-container-block' ),
								},
								{
									value: 'one-column-align-right',
									label: __( 'Right', 'fancypantsy-section-container-block' ),
								},
							] }
							onChange={ ( value ) => setAttributes( { columnLayoutOption: value } ) }
						/>

					</PanelRow>
				];

			} else if( columnsAmount === 2 ){
				return[
					<PanelRow>

						<SelectControl
							label={ __( 'Column layout option', 'fancypantsy-section-container-block' ) }
							value={ columnLayoutOption }
							options={ [
								{
									value: 'two-columns-equal',
									label: __( 'Equal width', 'fancypantsy-section-container-block' ),
								},
								{
									value: 'two-columns-small-left',
									label: __( 'Small column left', 'fancypantsy-section-container-block' ),
								},
								{
									value: 'two-columns-small-right',
									label: __( 'Small column right', 'fancypantsy-section-container-block' ),
								},
							] }
							onChange={ ( value ) => setAttributes( { columnLayoutOption: value } ) }
						/>

					</PanelRow>
				];
			}

		}

		function buttonAfterSectionFields(){

			if( buttonUrl && buttonUrl !== '' ){ 

				return[
					<TextControl
						className="button-text-field-wrapper"
				        label={ __( 'Button text', 'fancypantsy-section-container-block' ) }
				        placeholder={ __( 'Click here', 'fancypantsy-section-container-block' ) }
				        value={ buttonText }
				        onChange={ ( value ) => setAttributes( { buttonText: value } ) }
				    />,
					<ToggleControl
						className="button-target-field-wrapper"
				        label={ __( 'Open link on a new page?', 'fancypantsy-section-container-block' ) }
				        checked={ buttonTarget }
				        onChange={ ( buttonTarget ) => { setAttributes( { buttonTarget: buttonTarget } ) } }
				    />,
				    <SelectControl
							label={ __( 'Button alignment', 'fancypantsy-section-container-block' ) }
							value={ buttonAlignment }
							options={ [
								{
									value: 'align-left',
									label: __( 'Align left', 'fancypantsy-section-container-block' ),
								},
								{
									value: 'align-center',
									label: __( 'Align center', 'fancypantsy-section-container-block' ),
								},
								{
									value: 'align-right',
									label: __( 'Align right', 'fancypantsy-section-container-block' ),
								},
							] }

							onChange={ ( value ) => setAttributes( { buttonAlignment: value } ) }
						/>
				];

			}

		}

		function buildAfterSectionButton(){

			if( buttonUrl && buttonUrl !== '' ){

				let targetStr = '';

				if( buttonTarget && buttonTarget == true ){
					targetStr = '"_blank"';
				}

				let buttonTextStr = '';

				if( buttonText && buttonText !== '' ){
					buttonTextStr = buttonText;
				} else{
					buttonTextStr = __( 'Click here', 'fancypantsy-section-container-block' );
				}
				
				return[
					<div class="after-section-button-wrapper" data-button-alignment={buttonAlignment}>
						<a className="section-button" href={buttonUrl} target={targetStr}>{buttonTextStr}</a>
					</div>
				];

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

							onChange={ ( value ) => updateColumns( columnsAmount, value ) }
						/>

					</PanelRow>

					{ columnLayoutOptions() }

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
				
				<PanelBody
					title={ __( 'Button', 'fancypantsy-section-container-block' ) }
					initialOpen={ false }
				>
					<PanelRow>
						<label class="components-base-control__label fullwidth-label">{ __( 'Insert URL', 'fancypantsy-section-container-block' ) }</label>
						
						<URLInputButton
							url={ buttonUrl }
							onChange={ ( buttonUrl, post ) => setAttributes( { buttonUrl } ) }
						/>

						{ buttonAfterSectionFields() }

					</PanelRow>
				</PanelBody>

			</InspectorControls>,
			<div data-section-bg-alignment={sectionBGAlignment} data-column-layout-mode={columnLayoutOption} className={ props.className } style={{ ...marginStyles }}>
				{ customAnchorFunction() }
				<div className="container" style={{...paddingStyles}}>
					<div className="background-element" style={{...backgroundPositionVar, ...backgroundImageVar, ...backgroundColorVal, ...stickyBackgroundVar }}></div>
					{ headingFunction() }
					<div className={ columnRowClass }>
						<InnerBlocks 
							template={ TEMPLATE }
		   				 	templateLock="insert"
		   				 	allowedBlocks={ [ 'fp/column-block' ] }
			   			/>
		   			</div>
		   			{ buildAfterSectionButton() }
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
			customAnchor,
			columnLayoutOption,
			buttonUrl,
			buttonText,
			buttonTarget,
			buttonAlignment
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
			if( backgroundImageUrl !== '' && backgroundImageUrl !== null ){
				let bgXPos = (backgroundImagePosition.x * 100)+'%';
				let bgYPos = (backgroundImagePosition.y * 100)+'%';
				
				backgroundPositionVar = { backgroundPosition: bgXPos+' '+bgYPos };
			}
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

		function buildAfterSectionButton(){

			if( buttonUrl && buttonUrl !== '' ){

				let targetStr = '';

				if( buttonTarget && buttonTarget == true ){
					targetStr = '"_blank"';
				}

				let buttonTextStr = '';

				if( buttonText && buttonText !== '' ){
					buttonTextStr = buttonText;
				} else{
					buttonTextStr = __( 'Click here', 'fancypantsy-section-container-block' );
				}
				
				return[
					<div class="after-section-button-wrapper" data-button-alignment={buttonAlignment}>
						<a className="section-button" href={buttonUrl} target={targetStr}>{buttonTextStr}</a>
					</div>
				];

			}

		}

		if( columnsAmount ){
			columnRowClass = 'block-row blocks-in-row-'+columnsAmount;
		}

		return (
			<section data-section-bg-alignment={sectionBGAlignment} data-column-layout-mode={columnLayoutOption} className={ props.className } style={{ ...marginStyles }}>
				{ customAnchorFunction() }
				<div className="container" style={{...paddingStyles}}>
					<div className="background-element" style={{...backgroundPositionVar, ...backgroundImageVar, ...backgroundColorVal, ...stickyBackgroundVar }}></div>
					{ headingFunction() }
					<div className={ columnRowClass }>
						<InnerBlocks.Content />
					</div>
					{ buildAfterSectionButton() }
				</div>
			</section>
		);
	},
} );
