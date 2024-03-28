const defaultOptions = {
	baseClassPrefix: 'wmx',
	openClass: 'open',
	itemAttributes: ['class', 'disabled'],
	
	// callbacks
	onInit: (wmxselect) => {},
	onSelect: (wmxselect) => {},
}

class WmxSelect {
	constructor(options) {
		// Enrich default options
		this.options = {...defaultOptions, ...options}

		if(!this.options.element){
			this.element = document.querySelector('select')
		}
		else {
			this.element = this.options.element
		}

		if(!this.element) return this; // Stop if no element

		this.id = this.options.baseClassPrefix + '-' + ( this.element.id || + (Math.random() + 1).toString(36).substring(7) )

		this.buildHtml()

		return this
	}

	buildHtml(){
		this.container = document.createElement('div')
		this.container.classList.add(`${this.options.baseClassPrefix}-select`)
		this.container.id = this.id

		// Button and wrapper
		this.button = document.createElement('button')
		this.button.classList.add(`${this.options.baseClassPrefix}-button`)
		this.button.innerText = this.getSelectedText()
		this.button.addEventListener('click', this.toggleOpenEvent)

		const buttonWrap = document.createElement('div')
		buttonWrap.classList.add(`${this.options.baseClassPrefix}-buttonWrap`)
		buttonWrap.append(this.button)

		// Dropdown and wrapper
		this.dropdown = document.createElement('ul')
		this.dropdown.classList.add(`${this.options.baseClassPrefix}-dropdown`)
		this.dropdown.addEventListener('click', this.clickOptionEvent)

		const dropDownWrap = document.createElement('div')
		dropDownWrap.classList.add(`${this.options.baseClassPrefix}-dropdownWrap`)
		dropDownWrap.append(this.dropdown)

		this.renderDropdownOptions()

		// Place wrapper element end add children
		this.element.before(this.container)
		this.container.append(buttonWrap)
		this.container.append(dropDownWrap)
		this.container.append(this.element)

		// Click outside
		document.addEventListener('click', event => {
			if (!this.container.contains(event.target)) {
				this.container.classList.remove(this.options.openClass)		
			}
		})
		
		// if original select changes
		this.element.addEventListener('change', this.changeEvent)

		this.options.onInit(this)

	}

	close(){
		this.container.classList.remove(this.options.openClass)
	}

	toggleOpenEvent = event => {
		event.preventDefault()
		this.toggleOpen()
	}
	toggleOpen() {
		this.container.classList.toggle(this.options.openClass)
	}

	changeEvent = () => {
		// is there an additional icon
		const svg = this.button.querySelector('svg')

		this.button.innerText = this.getSelectedText()
		if(svg) this.button.append(svg)
		this.renderDropdownOptions()

		this.element.dispatchEvent(new Event('wmx:change'))
		this.options.onSelect(this)
	}

	clickOptionEvent = (event) => {
		const {target, currentTarget} = event

		if(target.tagName === 'LI') {
			event.preventDefault()
			this.element.value = target.getAttribute('data-value') || ''
			this.getSelectedElement().setAttribute('selected', 'selected')
			this.changeEvent()
		}

		this.close()
	}

	renderDropdownOptions(){
		this.dropdown.innerHTML = ''
		let selected = false
		this.getSelectOptions().forEach(opt => {
			const li = document.createElement('li')
			li.setAttribute('data-value', opt.value)
			li.innerText = opt.innerText

			// Additional properties
			this.options.itemAttributes.forEach(attr => {
				if(opt.hasAttribute(attr)){
					li.setAttribute(attr, opt.getAttribute(attr))
				}
			})

			if(opt == this.getSelectedElement()){
				li.classList.add(`${this.options.baseClassPrefix}-selected`)
				li.setAttribute('selected', 'selected', 'selected')
				selected = true
			}
			this.dropdown.append(li)
		})
	}

	getSelectOptions(){
		return this.element.querySelectorAll('option')
	}

	getSelectedElement(){
		const val = this.element.value
		return Array.from(this.getSelectOptions()).filter(opt => opt.value == val).shift()
	}
	getSelectedText(){
		if (typeof this.getSelectedElement() != 'undefined') {
		  return this.getSelectedElement().innerText
		} else {
		  return '-';
		}
	}
}