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
    		default: '{ "top":"0", "right":"auto", "bottom":"auto", "left":"0" }',
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
        },
        sectionTitleHeading: {
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
			sectionTitleHeading
		} = attributes;

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
			if( backgroundImageUrl != null || backgroundColor != null ){
				return [

					<PanelRow>

						<SelectControl
							label={ __( 'Achtergrond uitlijning' ) }
							value={ backgroundAlignment }
							options={ [
								{
									value: 'none',
									label: __( 'Midden uitlijnen' ),
								},
								{
									value: 'align-left',
									label: __( 'Links uitlijnen' ),
								},
								{
									value: 'align-right',
									label: __( 'Rechts uitlijnen' ),
								},
								{
									value: 'align-fullwidth',
									label: __( 'Volle breedte' ),
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
				        label="Sticky achtergrond"
				        checked={ stickySectionBackground }
				        onChange={ ( stickySectionBackground ) => { setAttributes( { stickySectionBackground: stickySectionBackground } ) } }
				    />
				</PanelRow>,
				<PanelRow>
					<SelectControl
						label={ __( 'Achtergrond positie' ) }
						value={ backgroundImagePosition }
						options={ [
							{
								value: 'top left',
								label: __( 'Boven links' ),
							},
							{
								value: 'top center',
								label: __( 'Boven midden' ),
							},
							{
								value: 'Boven rechts',
								label: __( 'Boven rechts' ),
							},
							{
								value: 'center left',
								label: __( 'Midden links' ),
							},
							{
								value: 'center center',
								label: __( 'Midden midden' ),
							},
							{
								value: 'center right',
								label: __( 'Midden rechts' ),
							},
							{
								value: 'bottom left',
								label: __( 'Beneden links' ),
							},
							{
								value: 'bottom center',
								label: __( 'Beneden midden' ),
							},
							{
								value: 'bottom right',
								label: __( 'Beneden rechts' ),
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
				<span class="remove-section-img" onClick={removeImage}> { __( 'Remove' ) } </span>
			);
		};

		function headingFunction(){
			// if( sectionTitle ){

			// 	console.log( sectionTitleHeading );

			// 	// let fullHeading = '<'+sectionTitleHeading+'>'+sectionTitle+'</'+sectionTitleHeading+'>';
			// 	// let headingHtml = headingHtml.html( fullHeading );

			// 	return [
			// 		<dangerouslySetInnerHTML={__html: sectionTitleHeading} />hoi</div>
			// 	];
			// }
			
			return ('<p>sectiontitle</p>');

		}

		return [
			<InspectorControls>
				<PanelBody
					title={ __( 'Instellingen' ) }
					initialOpen={ true }
				>
					<PanelRow>

						<TextControl
					        label="Section title"
					        placeholder="Vul hier een section title in.."
					        value={ sectionTitle }
					        onChange={ ( value ) => setAttributes( { sectionTitle: value } ) }
					    />

					</PanelRow>
					<PanelRow>

						<RadioControl
							label={ __( 'Section title heading' ) }
							value={ sectionTitleHeading }
							selected={ sectionTitleHeading }
							options={ [
								{
									value: 'h1',
									label: __( 'H1' ),
								},
								{
									value: 'h2',
									label: __( 'H2' ),
								},
								{
									value: 'h3',
									label: __( 'H3' ),
								},
								{
									value: 'h4',
									label: __( 'H4' ),
								},
								{
									value: 'h5',
									label: __( 'H5' ),
								},
								{
									value: 'h6',
									label: __( 'H6' ),
								},
							] }

							onChange={ ( value ) => setAttributes( { sectionTitleHeading: value } ) }
						/>

					</PanelRow>
					<PanelRow>

						<SelectControl
							label={ __( 'Blokken langs elkaar' ) }
							value={ columnsAmount }
							options={ [
								{
									value: '1',
									label: __( '1' ),
								},
								{
									value: '2',
									label: __( '2' ),
								},
								{
									value: '3',
									label: __( '3' ),
								},
								{
									value: '4',
									label: __( '4' ),
								},
							] }

							onChange={ ( value ) => setAttributes( { columnsAmount: parseInt(value) } ) }
						/>

					</PanelRow>
				</PanelBody>
				
				<PanelBody
					title={ __( 'Achtergrond' ) }
					initialOpen={ false }
				>

					<PanelRow>
						
						<div className="components-base-control">
							
							<label class="components-base-control__label">{ __( 'Afbeelding' ) }</label>
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
											>Afbeelding aanpassen
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
							<label class="components-base-control__label">{ __( 'Achtergrond kleur' ) }</label>

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

			</InspectorControls>,
			<div className={ props.className }>
				{ headingFunction() }
				<InnerBlocks 
   				 	template={ times( parseInt(columnsAmount), () => [ 'fp/column-block' ] ) }
   				 	templateLock="all"
   				 	allowedBlocks={ [ 'fp/column-block' ] }
	   			/>
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
		return (
			<div className={ props.className }>
				<InnerBlocks.Content />
			</div>
		);
	},
} );
