import {ImageOverlay} from './ImageOverlay';
import * as DomUtil from '../dom/DomUtil';
import * as Util from '../core/Util';

/*
 * @class ObjectOverlay
 * @aka L.ObjectOverlay
 * @inherits ImageOverlay
 *
 * Used to load and display a svg file over specific bounds of the map. Extends `ImageOverlay`.
 *
 * A object overlay uses the [`<object>`](https://developer.mozilla.org/docs/Web/HTML/Element/object) HTML5 element.
 *
 * @example
 *
 * ```js
 * var objectData = 'my_svg_file_path.svg',
 * var objectBounds = [[0, 0], [1000, 1000]];
 * L.objectOverlay(objectData, objectBounds ).addTo(map);
 * ```
 */

export var ObjectOverlay = ImageOverlay.extend({

	// @section
	// @aka ObjectOverlay options
	options: {
		// @option type: String = ''
		// The content type of the resource specified by data. At least one of data and type must be defined.
		type: '',

		// @option name: String = ''
		// The name of valid browsing context. Empty by default.
		name: '',

		// @option usemap: String = ''
		// A hash-name reference to a <map> element; that is a '#' followed by the value of a name of a map element.
		// Empty by default.
		usemap: '',

		// @option height: String = ''
		// The height of the displayed resource, in CSS pixels. Empty by default.
		height: '',

		// @option width: String = ''
		// The width of the display resource, in CSS pixels. Empty by default.
		width: ''
	},

	_initImage: function () {
		var wasElementSupplied = this._url.tagName === 'OBJECT';
		var object = this._image = wasElementSupplied ? this._url : DomUtil.create('object');

		DomUtil.addClass(object, 'leaflet-image-layer');
		if (this._zoomAnimated) { DomUtil.addClass(object, 'leaflet-zoom-animated'); }

		object.onselectstart = Util.falseFn;
		object.onmousemove = Util.falseFn;

		// @event load: Event
		// Fired when the ImageOverlay layer has loaded its image
		object.onload = Util.bind(this.fire, this, 'load');
		object.onerror = Util.bind(this._overlayOnError, this, 'error');

		if (wasElementSupplied) {
			this._url = object.data;
			return;
		}

		object.data = this._url;
		object.type = this.options.type;
		object.name = this.options.name;
		object.usemap = this.options.usemap;
		object.height = this.options.height;
		object.width = this.options.width;
	},
});

// @factory L.objectOverlay(data: String|HTMLObjectElement, bounds: LatLngBounds, options?: ObjectOverlay options).
// Instantiates an image overlay object given the address of the resource as a valid URL (or a object element) and the
// geographical bounds it is tied to.
export function objectOverlay(data, bounds, options) {
	return new ObjectOverlay(data, bounds, options);
}
