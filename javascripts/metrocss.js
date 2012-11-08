$(function() {
	//prettyPrint();
	if (window.prettyPrint) {
		window.prettyPrint();
	}	

/*	$("input").bind("focus", function() {
		$(this).css("borderColor", "#212121");
	}).bind("blur", function() {
		$(this).css("borderColor", "#B3B3B3");
	})*/

	// placeholder function
	~function() {
		function placeholder() {
			$.each($("input[placeholder]"), function() {
				this.value = $(this).attr("placeholder");
				$(this).css("color", "#A9A9A9");
			});
		};
		if("placeholder" in document.createElement("input") === false) {
			placeholder();
			$("input[placeholder]").bind("focus", function() {
				if(this.value === $(this).attr("placeholder")) {
					this.value = "";
					$(this).css("color", "#212121");
				}
			}).bind("blur", function() {
				if($(this).val() == "") {
					placeholder();
				}
			});
		}
	}();



/*	$("form").attr("novalidate") || $("form").attr("novalidate", "true");
	
	$("form").bind("submit", function(e) {
		$("[required]").each(function() {
			$this = $(this);
			if ($this.val() === "" || $this.val() === $this.attr("placeholder")) {
				$this.css("borderColor", "red");
				e.preventDefault();
				return false;
			}
		})
	})*/

	$("input[data-content]").bind("focus", function() {
		$(this).popover("show");
	}).bind("blur", function() {
		$(this).popover("hide");
	})

	//dropselect
	~function() {
		var hideMenu;
		$(".dropselect-ok, .dropselect-menu").bind("mouseenter", function() {
			clearTimeout(hideMenu);
			$(".dropselect-menu").slideDown(200);
		}).bind("mouseleave", function() {
			hideMenu = setTimeout(function() {
				$(".dropselect-menu").slideUp(80);
			}, 400);			
		});

		$(".dropselect-menu").on("click", "a", function(e) {
			e.preventDefault();
			$(".dropselect-ok a").text($(this).text());
			$(".dropselect-menu").slideUp(80);
		})
	}()
	// close alert
	var Alert = function() {}

	Alert.prototype = {
		Constructor: Alert,
		close: function(e) {
			e && e.preventDefault();
			var parent = e && $(e.target).parent("div") || $(".alert");;
			parent.slideUp("normal", function() {
				$(this).trigger("closed");
				parent.remove();
			});
		}
	}

	$(".alert").on("click", ".alert-close", Alert.prototype.close);

	$.fn.alert = function(option) {
		var tmp = new Alert;
		$(this).each(function() {
			if(option === 'close') tmp[option].call($(this));
		})
		return $(this);
	}

	// change tab
	$(".tab-title li").bind("click", function(e) {
		e.preventDefault();
		var $this = $(this),
				parentTitle = $this.parents(".tab-title"),
				contents = parentTitle.next(),
				dataTab = $this.children("a").data("tab");

		parentTitle.children("li").removeClass("active");
		$this.addClass("active");

		contents.children(".active").fadeOut("fast", function() {
			$(this).removeClass("active");
			contents.children("[data-pane = " + dataTab + "]").addClass("active").fadeIn(200);
			parentTitle.parent(".tab").trigger("shown")
		});
	});

	// popover
	var Popover = function(elem, option) {
			var placement = option.placement || elem.data("placement") || "left",
				title = option.title || elem.data("title") || "",
				content = option.content || elem.data("content"),
				className = option.className || "",
				offset = elem.offset()
				css = {};
				if(placement == "left") {
					css = {
						'left': offset.left + elem.outerWidth() + 10,
						'top': offset.top
					}
				} else {
					css = {
						'left': offset.left,
						'top': offset.top + elem.outerHeight() + 10
					}
				}
			var titleHmtl = ""
			if(title) {
				titleHmtl += '<div class="popover-title"><h4>' + title + '</h4></div>';
			}
			html = '<div class="popover ' + className + '" style="z-index:1000; display:none; position: absolute;"><span class="popover-pointer ' + placement + '"><s></s></span>' + titleHmtl + '<div class="popover-content"><p>' + content + '</p></div></div>';

			elem.after($(html).css(css));
			this.elem = elem;
		}

	Popover.prototype = {
		Constructor: Popover,
		show: function() {
			this.elem.next().show();
		},
		hide: function() {
			this.elem.next().hide();
		},
		toggle: function() {
			this.elem.next().toggle();
		},
		destory: function() {
			this.elem.data("popover", "");
			this.elem.next(".popover").remove();
		}

	}

	$.fn.popover = function(option) {
		return $(this).each(function() {
			var $this = $(this);
			if(!$this.data("popover")) {
				$this.data("popover", new Popover($this, option));
			}
			if(typeof option == 'string') {
				$this.data("popover")[option]();
			}
		});
	}

	//按钮组
	$(".btn-group").on("click", ".btn", function(e) {
		e.preventDefault();
		var $this = $(this);
		var parent = $this.parents("div");
		if(parent.hasClass("radio")) {
			parent.children("a, button").each(function() {
				$(this).removeClass("active");
			})
		}
		$this.toggleClass("active");
	})

});