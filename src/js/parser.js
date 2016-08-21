var regexpSkladniki = /Składniki[\S\s]*>[^<>]*<[\S\s]*Przygotowanie/g;

$.ajax({
    url: 'http://www.mniammniam.com/Chili_z_soczewicy-1898p.html',
    type: 'GET',
    success: function(res) {
        var text = res.responseText;
        var skladniki = text.match(regexpSkladniki);
        console.log(skladniki);
        $(".found").html(skladniki);
    }
});
