import {AbstractPluginResolver} from "../../../page/services/abstract-classes/abstract-plugin-resolver";
import {ButtonResolverService} from "../../button/services/button-resolver.service";
import {CarouselResolverService} from "../../carousel/services/carousel-resolver.service";
import {FormResolverService} from "../../form/services/form-resolver.service";
import {ImageResolverService} from "../../image/services/image-resolver.service";
import {MenuResolverService} from "../../menu/services/menu-resolver.service";
import {TextResolverService} from "../../text/services/text-resolver.service";
import {VideoResolverService} from "../../video/services/video-resolver.service";
import {IconResolverService} from "../../icon/services/icon-resolver.service";

export const PluginsProvider = [
  {provide: AbstractPluginResolver, useClass: ButtonResolverService, multi: true},
  {provide: AbstractPluginResolver, useClass: CarouselResolverService, multi: true},
  {provide: AbstractPluginResolver, useClass: FormResolverService, multi: true},
  {provide: AbstractPluginResolver, useClass: ImageResolverService, multi: true},
  {provide: AbstractPluginResolver, useClass: MenuResolverService, multi: true},
  {provide: AbstractPluginResolver, useClass: TextResolverService, multi: true},
  {provide: AbstractPluginResolver, useClass: VideoResolverService, multi: true},
  {provide: AbstractPluginResolver, useClass: IconResolverService, multi: true},
  // { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' }

];
