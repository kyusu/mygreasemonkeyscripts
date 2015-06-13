// ==UserScript==
// @name myproject fixes
// @namespace https://myproject.telekom.de/pi/projects/relaunch-telefonie-center/wiki/Userscript
// @include https://myproject.telekom.de/pi/rb/taskboards/*
// @match https://myproject.telekom.de/pi/rb/taskboards/*
// ==/UserScript==

(function () {
    var $ = jQuery;

    MP = {
        run: function () {
            this.initializeModules();
            this.loadSettings();
            this.buildMenu();
        },

        initializeModules: function () {
            var modules = [];

            // Move old backlogs
            modules.push({
                id: 'move-backlogs',
                menuItem: 'Move old backlogs',
                onActivate: function () {
                    $('body').addClass(this.id);
                    $('#sprint_backlogs_container').find('.backlog').each(function () {
                        var backlog = $(this);
                        var sprintLength = 1000 * 60 * 60 * 24 * 14;
                        var now = new Date();
                        var backlogStartDate = new Date(backlog.find('.start_date').text());
                        if (now - backlogStartDate > sprintLength) {
                            backlog.appendTo('#owner_backlogs_container');
                        }
                    });
                },
                onDeactivate: function () {
                    $('body').removeClass(this.id);
                }
            });

            // Collapsible backlogs
            modules.push({
                id: 'collapsible-backlogs',
                menuItem: 'Collapsible backlogs',
                onActivate: function () {
                    $('body').addClass(this.id);
                    $('.backlog').each(function () {
                        var backlog = $(this);
                        var menu = backlog.find('.menu .items');
                        menu.find(':contains(Stories)').remove();
                        menu.find(':contains(Export)').remove();
                        backlog.find('.model .name').prepend(menu);

                    });
                    $('.backlog .menu').on('click', function (e) {
                        var backlog = $(e.target).parents('.backlog');
                        backlog.toggleClass('expanded');
                        backlog.find('.menu .ui-icon').toggleClass('ui-icon-carat-1-s');
                    });
                    $('.backlog .header .editable').off('mouseup');
                },
                onDeactivate: function () {
                    $('body').removeClass(this.id);
                }
            });

            // Expand first backlogs
            modules.push({
                id: 'expand-first-backlog',
                menuItem: 'Expand first backlog',
                onActivate: function () {
                    var firstBacklog = $($('#sprint_backlogs_container').find('.backlog')[0]);
                    $('body').addClass(this.id);
                    firstBacklog.addClass('expanded');
                    firstBacklog.find('.menu .ui-icon').removeClass('ui-icon-carat-1-s');
                },
                onDeactivate: function () {
                    $('body').removeClass(this.id);
                }
            });

            // Hide closed tasks
            modules.push({
                id: 'hide-closed-tasks',
                filter: 'taskboard',
                menuItem: 'Hide closed tasks',
                onActivate: function () {
                    $('body').addClass(this.id);
                },
                onDeactivate: function () {
                    $('body').removeClass(this.id);
                }
            });

            // Hide closed stories
            modules.push({
                id: 'hide-closed-stories',
                filter: 'taskboard',
                menuItem: 'Hide closed stories',
                onActivate: function () {
                    $('body').addClass(this.id);
                    $('.story.closed').each(function () {
                        $(this).parent().parent().addClass('closed');
                    });
                },
                onDeactivate: function () {
                    $('body').removeClass(this.id);
                    $('.story.closed').each(function () {
                        $(this).parent().parent().removeClass('closed');
                    });
                }
            });

            // Hide implemented stories
            modules.push({
                id: 'hide-implemented-stories',
                filter: 'taskboard',
                menuItem: 'Hide implemented stories',
                onActivate: function () {
                    $('body').addClass(this.id);
                    jQuery('.status:contains(Implemented)').parents('tr').each(function () {
                        var story = $(this);
                        var activeTasks = 0;
                        activeTasks += story.find('[id$="_14"]').children().length;
                        activeTasks += story.find('[id$="_2"]').children().length;
                        activeTasks += story.find('[id$="_13"]').children().length;
                        activeTasks += story.find('[id$="_3"]').children().length;
                        if (!activeTasks) {
                            story.addClass('implemented');
                        }
                    });
                },
                onDeactivate: function () {
                    $('body').removeClass(this.id);
                    $('tr.implemented').each(function () {
                        $(this).removeClass('implemented');
                    });
                }
            });

            // Hide resolved stories
            modules.push({
                id: 'hide-resolved-stories',
                filter: 'taskboard',
                menuItem: 'Hide resolved stories',
                onActivate: function () {
                    $('body').addClass(this.id);
                    jQuery('.status:contains(Resolved)').parents('tr').each(function () {
                        var story = $(this);
                        var activeTasks = 0;
                        activeTasks += story.find('[id$="_14"]').children().length;
                        activeTasks += story.find('[id$="_2"]').children().length;
                        activeTasks += story.find('[id$="_13"]').children().length;
                        activeTasks += story.find('[id$="_3"]').children().length;
                        if (!activeTasks) {
                            story.addClass('resolved');
                        }
                    });
                },
                onDeactivate: function () {
                    $('body').removeClass(this.id);
                    $('tr.resolved').each(function () {
                        $(this).removeClass('resolved');
                    });
                }
            });

            // Hide impediments
            modules.push({
                id: 'hide-impediments',
                filter: 'taskboard',
                menuItem: 'Hide impediments',
                onActivate: function () {
                    $('body').addClass(this.id);
                },
                onDeactivate: function () {
                    $('body').removeClass(this.id);
                }
            });


            // Show "REVIEW ME!" in non-assigned resolved tasks
            modules.push({
                id: 'show-review-reminder',
                filter: 'taskboard',
                menuItem: 'Show review reminder',
                onActivate: function () {
                    $('body').addClass(this.id);
                },
                onDeactivate: function () {
                    $('body').removeClass(this.id);
                }
            });


            // Auto reloading the current view
            modules.push({
                id: 'auto-reload',
                filter: 'taskboard',
                menuItem: 'Auto-reload taskboard',
                onActivate: function () {
                    $('body').addClass(this.id);
                    this.interval = setInterval(function () {
                        var reload;

                        reload = !document.hasFocus();
                        reload = reload && $('.modal:visible').length === 0;
                        reload = reload && $('.sb-taskbox').length === 0;
                        reload = reload && $('.task_editor_dialog:visible').length === 0;
                        reload = reload && $('.dragging').length === 0;

                        if (reload) {
                            $('body').append('<div class="sb-loading-mask"></div>');
                            window.location.reload();
                        }
                    }, 300000);
                },
                onDeactivate: function () {
                    $('body').removeClass(this.id);
                    clearInterval(this.interval);
                }
            });

            // Keep alive, keep alive
            /*modules.push({
             id: 'keep-alive',
             menuItem: 'Keep session alive',
             onActivate: function () {
             var xhReq = new XMLHttpRequest();
             this.interval = setInterval(function () {
             xhReq.open('GET', 'https://myproject.telekom.de/pi/rb/taskboards/1495?project_id=640', true);
             xhReq.send(null);
             }, 300000);
             },
             onDeactivate: function () {
             clearInterval(this.interval);
             }
             });*/


            // Restrict 'Story' column
            modules.push({
                id: 'narrow-story',
                filter: 'taskboard',
                menuItem: 'Set "Story" width to 1',
                onActivate: function () {
                    $('body').addClass(this.id);
                },
                onDeactivate: function () {
                    $('body').removeClass(this.id);
                }
            });

            // Restrict 'In Progress' column
            modules.push({
                id: 'narrow-in-progress',
                filter: 'taskboard',
                menuItem: 'Set "In Progress" width to 3',
                onActivate: function () {
                    $('body').addClass(this.id);
                },
                onDeactivate: function () {
                    $('body').removeClass(this.id);
                }
            });

            // Restrict 'On Hold' column
            modules.push({
                id: 'narrow-on-hold',
                filter: 'taskboard',
                menuItem: 'Set "On Hold" width to 1',
                onActivate: function () {
                    $('body').addClass(this.id);
                },
                onDeactivate: function () {
                    $('body').removeClass(this.id);
                }
            });

            // Restrict 'Rejected' column
            modules.push({
                id: 'narrow-rejected',
                filter: 'taskboard',
                menuItem: 'Set "Rejected" width to 1',
                onActivate: function () {
                    $('body').addClass(this.id);
                },
                onDeactivate: function () {
                    $('body').removeClass(this.id);
                }
            });

            // Restrict 'Closed' column
            modules.push({
                id: 'narrow-closed',
                filter: 'taskboard',
                menuItem: 'Set "Closed" width to 1',
                onActivate: function () {
                    $('body').addClass(this.id);
                },
                onDeactivate: function () {
                    $('body').removeClass(this.id);
                }
            });

            // Readable issues
            modules.push({
                id: 'readable-issues',
                filter: 'taskboard',
                menuItem: 'Make issues readable',
                onActivate: function () {
                    $('body').addClass(this.id);
                },
                onDeactivate: function () {
                    $('body').removeClass(this.id);
                }
            });

            modules.push({
                id: 'hidden-closed-tasks',
                filter: 'issues',
                menuItem: 'Hide closed tasks',
                onActivate: function () {
                    $('.issue.closed').parents('tr.issue').hide();
                },
                onDeactivate: function () {
                    $('.issue.closed').parents('tr.issue').show();
                }
            });

            // Sliding header by Thomas Rosenau
            modules.push({
                id: 'clone-header',
                filter: 'taskboard',
                menuItem: 'Keep header visible',
                header: $('#board_header'),
                onActivate: function () {
                    if (!this.clone) {
                        this.clone = $(this.header.clone(true));
                        this.clone.insertAfter(this.header);
                    }
                    this.clone.addClass(this.id);
                    this.setPosAndDisplay();
                    $(window).on('scroll', this.setPosAndDisplay.bind(this));
                },
                setPosAndDisplay: function () {
                    var offset = $(this.header).offset();
                    $(this.clone).css({
                        left: offset.left - window.scrollX,
                        display: window.scrollY < offset.top ? 'none' : 'table'
                    });
                },
                onDeactivate: function () {
                    this.clone.addClass('disabled');
                }
            });

            // Auto-assign
            modules.push({
                id: 'auto-assign',
                filter: 'taskboard',
                menuItem: '(Un-)Assign automatically',
                onActivate: function () {
                    RB.Task.origSaveDirectives = RB.Task.saveDirectives;
                    RB.Task.saveDirectives = function () {
                        var column = this.$.parent('td').first().attr('id').split("_")[1],
                            unassignColumns = ['14'/*new*/, '3'/*resolved*/, '6'/*rejected*/],
                            assignColumns = ['2'/*progress*/],
                            result = this.origSaveDirectives();

                        if (result.data.indexOf('assigned_to_id') === -1) {
                            if (assignColumns.indexOf(column) !== -1) {
                                result.data += '&assigned_to_id=' + MP.helper.getUserId();
                                this.$.css('background-color', MP.helper.getUserColor());
                            } else if (unassignColumns.indexOf(column) !== -1) {
                                result.data += '&assigned_to_id=';
                                this.$.css('background-color', '');
                            }
                        }

                        return result;
                    }
                },
                onDeactivate: function () {
                    RB.Task.saveDirectives = RB.Task.origSaveDirectives;
                }
            });

            modules.push({
                id: 'task-contextmenu',
                menuItem: 'Context menu for task',
                onActivate: function () {
                    jQuery('.task').unbind('mouseup').contextPopup({
                        items: [
                            {
                                label: 'Assign to me',
                                action: function (event) {
                                    var target = $(event.target),
                                        task;

                                    if (!target.hasClass('task')) {
                                        target = target.parents('.task');
                                    }
                                    task = target.data('this');
                                    task.tempSaveDirectives = task.saveDirectives;
                                    task.saveDirectives = function () {
                                        var directives = this.tempSaveDirectives();
                                        directives.data.replace(/&assigned_to_id=[0-9]*/g, '');
                                        directives.data += '&assigned_to_id=' + MP.helper.getUserId();
                                        this.$.css('background-color', MP.helper.getUserColor());
                                        return directives;
                                    };
                                    task.saveEdits();
                                    task.saveDirectives = task.tempSaveDirectives;
                                    delete task.tempSaveDirectives;
                                }
                            },
                            {
                                label: 'Unassign',
                                action: function (event) {
                                    var target = $(event.target),
                                        task;

                                    if (!target.hasClass('task')) {
                                        target = target.parents('.task');
                                    }
                                    task = target.data('this');
                                    task.tempSaveDirectives = task.saveDirectives;
                                    task.saveDirectives = function () {
                                        var directives = this.tempSaveDirectives();
                                        directives.data.replace(/&assigned_to_id=[0-9]*/g, '');
                                        directives.data += '&assigned_to_id=';
                                        this.$.css('background-color', '');
                                        return directives;
                                    };
                                    task.saveEdits();
                                    task.saveDirectives = task.tempSaveDirectives;
                                    delete task.tempSaveDirectives;
                                }
                            },
                            {
                                label: 'Commit message',
                                action: function (event) {
                                    var target = $(event.target),
                                        issue,
                                        subject,
                                        message;

                                    if (!target.hasClass('task')) {
                                        target = target.parents('.task');
                                    }


                                    issue = target.find('.id a').text();
                                    subject = target.find('.subject').text();
                                    message = 'Since I\'m not in the mood for Flash hacks, you\'ll have to copy that yourself. Sorry.';

                                    window.prompt(message, 'Ticket #' + issue + ': ' + subject);

                                }
                            }
                        ]
                    });
                }
            });

            modules.push({
                id: 'bulk-create',
                filter: 'taskboard',
                menuItem: 'Bulk Task Creation',
                onActivate: function () {
                    RB.Task.saveNew = function (subject) {
                        var j = this.$,
                            self = this,
                            saveDir = self.saveDirectives();

                        saveDir.data = saveDir.data + '&subject=' + encodeURIComponent(subject);

                        self.beforeSave();

                        self.unmarkError();
                        self.markSaving();

                        RB.ajax({
                            type: "POST",
                            url: saveDir.url,
                            data: saveDir.data,
                            success: function (d, t, x) {
                                self.afterSave(d, t, x);
                            },
                            error: function (x, t, e) {
                                self.error(x, t, e);
                            }
                        });
                    };
                    RB.Taskboard.origNewTask = RB.Taskboard.newTask;
                    RB.Taskboard.newTask = function (row) {
                        var storyTitle = row.find('.story .subject').text(),
                            overlay = $('<div class="sb-overlay"></div>'),
                            taskbox = $('<div class="sb-taskbox"></div>'),
                            heading = $('<h2></h2>').appendTo(taskbox),
                            subjects = $('<textarea></textarea>').appendTo(taskbox),
                            createButton = $('<button>Create tasks</button>').appendTo(taskbox),
                            cancelButton = $('<button>Cancel</button>').appendTo(taskbox);

                        heading.text('Create tasks for <b>' + storyTitle + '</b> (One task per line)');
                        createButton.click(function () {
                            $.each(subjects.val().split('\n'), function (index, subject) {
                                var task, o;

                                if ($.trim(subject) !== '') {
                                    task = $('#task_template').children().first().clone();
                                    row.find(".list").first().prepend(task);

                                    o = RB.Factory.initialize(RB.Task, task);
                                    o.saveNew(subject);
                                }
                            });
                            overlay.remove();
                            taskbox.remove();
                        });

                        cancelButton.click(function () {
                            overlay.remove();
                            taskbox.remove();
                        });

                        overlay.appendTo('body').show();
                        taskbox.appendTo('body').show();
                    };
                },
                onDeactivate: function () {
                    RB.Taskboard.newTask = RB.Taskboard.origNewTask;
                }
            });

            this.modules = modules;
        },

        loadSettings: function () {
            var settings = {};

            $.each(this.modules, function (index, module) {
                settings[module.id] = false;
            });

            savedSettings = this.helper.getCookie('sb_settings');

            savedSettings = savedSettings && JSON.parse(savedSettings);

            if (savedSettings) {
                $.extend(settings, savedSettings);
            }
            this.settings = settings;

            $.each(this.modules, function (index, module) {
                if (settings[module.id]) {
                    if (!module.filter || location.href.indexOf(module.filter) !== -1) {
                        module.onActivate();
                    }

                }
            });
        },

        saveSettings: function () {
            this.helper.setCookie('sb_settings', JSON.stringify(this.settings), 356);
        },

        buildMenu: function () {
            var sidebar = $('#main-menu'),
                options = $('<div class="sb-settings-menu"></div>');

            $.each(this.modules, (function (index, module) {
                var setting = module.id,
                    checkbox = $('<input type=checkbox id=' + setting + '><label for=' + setting + '>' + module.menuItem + '</label><br>');

                checkbox.prop('checked', this.settings[setting]);
                checkbox.change((function () {
                    var checked = checkbox.prop('checked');
                    if (!module.filter || location.href.indexOf(module.filter) !== -1) {
                        $('body')[checked ? 'addClass' : 'removeClass'](setting);
                        module[checked ? 'onActivate' : 'onDeactivate']();
                    }
                    this.settings[setting] = checked;
                    this.saveSettings();
                }).bind(this));
                checkbox.appendTo(options);
            }).bind(this));
            options.appendTo(sidebar);
        },

        helper: {
            setCookie: function (name, value, expiredays) {
                var exdate = new Date();
                exdate.setDate(exdate.getDate() + expiredays);
                document.cookie = name + '=' + escape(value) + ((expiredays === null) ? '' : ';path=/;expires=' + exdate.toGMTString());
            },
            getCookie: function (name) {
                var c_start, c_end;
                if (document.cookie.length > 0) {
                    c_start = document.cookie.indexOf(name + '=');
                    if (c_start !== -1) {
                        c_start = c_start + name.length + 1;
                        c_end = document.cookie.indexOf(';', c_start);
                        if (c_end === -1) {
                            c_end = document.cookie.length;
                        }
                        return unescape(document.cookie.substring(c_start, c_end));
                    }
                }
                return '';
            },
            addStoryClasses: function () {
                if (!this.addedStoryClasses) {
                    this.addedStoryClasses = true;
                    $('.story').each(function () {
                        if (/#(cf|tlb)/.test($(this).find('.subject').text())) {
                            $(this).parent().parent().addClass('team-left-bobbel');
                        } else if (/#(af|trb)/.test($(this).find('.subject').text())) {
                            $(this).parent().parent().addClass('team-right-bobbel');
                        } else if (/#(do|tmb)/.test($(this).find('.subject').text())) {
                            $(this).parent().parent().addClass('team-middle-bobbel');
                        } else if (/#(tbb)/.test($(this).find('.subject').text())) {
                            $(this).parent().parent().addClass('team-bottom-bobbel');
                        }
                    });
                }
            },
            getUserId: function () {
                this.userId = this.userId || $('[href*="/pi/users"]').attr('href').split('/')[3];
                return this.userId;
            },
            getUserColor: function () {
                this.userColor = this.userColor || $('.template [value="' + this.getUserId() + '"]').attr('color');
                return this.userColor;
            }
        }

    };

    /**
     * jQuery plugin for Pretty looking right click context menu.
     *
     * Requires popup.js and popup.css to be included in your page. And jQuery, obviously.
     *
     * Usage:
     *
     *   $('.something').contextPopup({
 *     title: 'Some title',
 *     items: [
 *       {label:'My Item', icon:'/some/icon1.png', action:function() { alert('hi'); }},
 *       {label:'Item #2', icon:'/some/icon2.png', action:function() { alert('yo'); }},
 *       null, // divider
 *       {label:'Blahhhh', icon:'/some/icon3.png', action:function() { alert('bye'); }},
 *     ]
 *   });
     *
     * Icon needs to be 16x16. I recommend the Fugue icon set from: http://p.yusukekamiyamane.com/
     *
     * - Joe Walnes, 2011 http://joewalnes.com/
     *   https://github.com/joewalnes/jquery-simple-context-menu
     *
     * MIT License: https://github.com/joewalnes/jquery-simple-context-menu/blob/master/LICENSE.txt
     */
    jQuery.fn.contextPopup = function (menuData) {
        // Define default settings
        var settings = {
            contextMenuClass: 'contextMenuPlugin',
            gutterLineClass: 'gutterLine',
            headerClass: 'header',
            seperatorClass: 'divider',
            title: '',
            items: []
        };

        // merge them
        $.extend(settings, menuData);

        // Build popup menu HTML
        function createMenu(e) {
            var menu = $('<ul class="' + settings.contextMenuClass + '"><div class="' + settings.gutterLineClass + '"></div></ul>')
                .appendTo(document.body);
            if (settings.title) {
                $('<li class="' + settings.headerClass + '"></li>').text(settings.title).appendTo(menu);
            }
            settings.items.forEach(function (item) {
                if (item) {
                    var rowCode = '<li><a href="#"><span></span></a></li>';
                    // if(item.icon)
                    //   rowCode += '<img>';
                    // rowCode +=  '<span></span></a></li>';
                    var row = $(rowCode).appendTo(menu);
                    if (item.icon) {
                        var icon = $('<img>');
                        icon.attr('src', item.icon);
                        icon.insertBefore(row.find('span'));
                    }
                    row.find('span').text(item.label);
                    if (item.action) {
                        row.find('a').click(function () {
                            item.action(e);
                        });
                    }
                } else {
                    $('<li class="' + settings.seperatorClass + '"></li>').appendTo(menu);
                }
            });
            menu.find('.' + settings.headerClass).text(settings.title);
            return menu;
        }

        // On contextmenu event (right click)
        this.bind('contextmenu', function (e) {
            var menu = createMenu(e)
                .show();

            var left = e.pageX + 5, /* nudge to the right, so the pointer is covering the title */
                top = e.pageY;
            if (top + menu.height() >= $(window).height()) {
                top -= menu.height();
            }
            if (left + menu.width() >= $(window).width()) {
                left -= menu.width();
            }

            // Create and show menu
            menu.css({zIndex: 1000001, left: left, top: top})
                .bind('contextmenu', function () {
                    return false;
                });

            // Cover rest of page with invisible div that when clicked will cancel the popup.
            var bg = $('<div></div>')
                .css({left: 0, top: 0, width: '100%', height: '100%', position: 'absolute', zIndex: 1000000})
                .appendTo(document.body)
                .bind('contextmenu click', function () {
                    // If click or right click anywhere else on page: remove clean up.
                    bg.remove();
                    menu.remove();
                    return false;
                });

            // When clicking on a link in menu: clean up (in addition to handlers on link already)
            menu.find('a').click(function () {
                bg.remove();
                menu.remove();
            });

            // Cancel event, so real browser popup doesn't appear.
            return false;
        });

        return this;
    };

    MP.run();
})();
