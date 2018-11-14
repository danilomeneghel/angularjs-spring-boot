jQuery(document).ready(function () {
    jQuery(".show-btn").click(function () {
        jQuery("#collapse-form").collapse('show');
    });
    jQuery(".hide-btn").click(function () {
        jQuery("#collapse-form").collapse('hide');
    });
    jQuery(".toggle-btn").click(function () {
        jQuery("#collapse-form").collapse('toggle');
    });

    jQuery(".collapse").on('show.bs.collapse', function () {
        jQuery(this).parent().find(".fa-plus").removeClass("fa-plus").addClass("fa-minus");
    }).on('hide.bs.collapse', function () {
        jQuery(this).parent().find(".fa-minus").removeClass("fa-minus").addClass("fa-plus");
    });
});