package com.krtpromanager.krtpromanagerSpringBoot.utils;

public class Utils {
    private static final String BASE_URL = "https://bucketbitmind.s3.amazonaws.com/";

    public static String construirUrl(String nombreArchivo) {
        if (nombreArchivo == null || nombreArchivo.isEmpty()) {
            return null;
        }
        return BASE_URL + nombreArchivo;
    }
}


